# VeriFeed — Conflict-Resolving Intelligent Oracle for GenLayer

[![GenLayer Bradbury](https://img.shields.io/badge/GenLayer-Bradbury%20Testnet%20(4221)-00e5ff?style=flat-square&logo=ethereum)](https://explorer-bradbury.genlayer.com/)
[![GenLayer Studio](https://img.shields.io/badge/GenLayer-Studio%20Network%20(61999)-blue?style=flat-square)](https://studio.genlayer.com/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%20%7C%20Python-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Build-Vite%208-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**VeriFeed** is a decentralized, conflict-resolving intelligent oracle powered by **GenLayer Intelligent Contracts**. When multiple web sources, news outlets, or data APIs provide contradictory information about real-world events, VeriFeed reaches deterministic on-chain consensus through validator LLM cross-examination and the **Equivalence Principle**.

---

## 🌟 Key Innovations

1. **Non-Deterministic Web Ingestion (`gl.get_webpage`)**  
   Every GenLayer validator independently fetches candidate URLs in a non-deterministic execution sandbox without relying on centralized API aggregators or trusted relayer feeds.

2. **Validator LLM Reasoning & Semantic Equivalence (`gl.exec_prompt` & `gl.eq_principle_prompt_llm`)**  
   Validators execute multi-model reasoning prompts to dissect official claims vs unverified rumors. GenLayer's Equivalence Principle guarantees consensus even when models formulate responses with slight phrasing differences.

3. **Optimistic Staking & Dispute Escalation Game**  
   Any user or protocol can challenge a finalized verdict by posting an on-chain bond of **50 $GEN** and providing counter-evidence URLs. Validators re-evaluate the full evidence matrix in an escalated consensus round.

4. **Self-Contained Verdict Bundle**  
   Resolutions output the ground-truth answer, a confidence score (0–100%), consensus rationale, and the individual corroboration status (`agreed` vs `conflicted`) for each source.

---

## ⛓️ On-Chain Deployments & Networks

| Network | Chain ID | RPC Endpoint | Contract Address | Explorer |
| :--- | :--- | :--- | :--- | :--- |
| **GenLayer Bradbury Testnet** | `4221` (`0x107d`) | `https://rpc-bradbury.genlayer.com` | [`0x8a927cD5E4D1A456F26E652391054C345Fe490B6`](https://explorer-bradbury.genlayer.com/address/0x8a927cD5E4D1A456F26E652391054C345Fe490B6) | [Bradbury Explorer](https://explorer-bradbury.genlayer.com/) |
| **GenLayer Studio Network** | `61999` (`0xf22f`) | `https://studio.genlayer.com/api` | [`0x65ACF9fE36A02Fa6e30CFD8CE2Ee4F53463dE934`](https://genlayer-explorer.vercel.app) | [Studio Explorer](https://genlayer-explorer.vercel.app) |

---

## 🏗️ Architecture

```
                  +----------------------------------------------+
                  |              User / Prediction Market         |
                  |     Submits Query with 2-5 Web URLs          |
                  +-----------------------+----------------------+
                                          |
                                          v
                  +----------------------------------------------+
                  |         VeriFeed Intelligent Contract         |
                  |         (Python SDK running on GenLayer)     |
                  +-----------------------+----------------------+
                                          |
                +-------------------------+-------------------------+
                |                         |                         |
                v                         v                         v
     +--------------------+     +--------------------+     +--------------------+
     | Validator Node Alpha|     | Validator Node Beta|     | Validator Node Gamma|
     | gl.get_webpage(url)|     | gl.get_webpage(url)|     | gl.get_webpage(url)|
     | Llama-3.3-70B      |     | DeepSeek-V3        |     | Mistral-Large      |
     +----------+---------+     +----------+---------+     +----------+---------+
                |                          |                          |
                +--------------------------+--------------------------+
                                          |
                                          v
                  +----------------------------------------------+
                  |       Equivalence Principle Consensus        |
                  |        gl.eq_principle_prompt_llm()          |
                  |  Verifies semantic agreement across models   |
                  +-----------------------+----------------------+
                                          |
                                          v
                  +----------------------------------------------+
                  |        Finalized Verdict Stored in State     |
                  |  - Ground-truth Answer: "Real Madrid"        |
                  |  - Confidence Score: 99.4%                   |
                  |  - Rationale & Corroborated Evidence Matrix  |
                  +----------------------------------------------+
```

---

## 🐍 Intelligent Contract Source Code (`VeriFeedOracle.py`)

```python
# ==============================================================================
# VeriFeed: Conflict-Resolving Intelligent Oracle
# Framework: GenLayer Intelligent Contract (Python SDK)
# ==============================================================================

import json

class VeriFeedOracle:
    def __init__(self):
        self.steward = gl.message.sender
        self.question_count = 0
        self.questions = {}
        self.min_stake_dispute = 50 * (10 ** 18)  # 50 GEN

    def create_question(self, title: str, sources_json: str, output_format: str, category: str) -> int:
        assert len(title) > 10, "Question title too short"
        sources = json.loads(sources_json)
        assert len(sources) >= 2, "Must provide at least 2 sources"
        assert len(sources) <= 5, "Maximum 5 sources per question"

        self.question_count += 1
        q_id = self.question_count

        self.questions[q_id] = {
            "id": q_id,
            "creator": gl.message.sender,
            "title": title,
            "sources": sources,
            "output_format": output_format,
            "category": category,
            "status": "PENDING",
            "verdict": "",
            "confidence_score": 0.0,
            "rationale": "",
            "dispute_round": 1
        }

        self._resolve_internal(q_id)
        return q_id

    def _resolve_internal(self, q_id: int):
        q = self.questions[q_id]
        evidence_bundle = []

        # Step 1: GenLayer Non-Deterministic Web Ingestion
        for source in q["sources"]:
            try:
                page_text = gl.get_webpage(source["url"])
                evidence_bundle.append({
                    "url": source["url"],
                    "content": page_text[:4000]
                })
            except Exception as e:
                evidence_bundle.append({"url": source["url"], "error": str(e)})

        # Step 2: Validator Multi-LLM Reasoning & Equivalence Check
        prompt = f"""
        Judge this on-chain oracle question: {q['title']}
        Raw evidence: {json.dumps(evidence_bundle)}
        Synthesize ground truth, resolve conflicts, output confidence (0-100), and rationale.
        """
        result = json.loads(gl.exec_prompt(prompt))

        # Step 3: Equivalence consensus verification
        assert gl.eq_principle_prompt_llm(f"Check verdict: '{result['verdict']}' against evidence"), "Consensus failed"

        q["verdict"] = result["verdict"]
        q["confidence_score"] = float(result.get("confidence", 99.0))
        q["rationale"] = result["rationale"]
        q["status"] = "FINALIZED"
```

---

## 💻 Consumer Integration

### TypeScript / Node.js (`genlayer-js`)

```typescript
import { createClient, chains } from 'genlayer-js';

const client = createClient({ chain: chains.testnetBradbury });
const VERIFEED_ADDRESS = '0x8a927cD5E4D1A456F26E652391054C345Fe490B6';

// Query oracle verdict
async function getVerdict(questionId: number) {
  const result = await client.readContract({
    address: VERIFEED_ADDRESS,
    functionName: 'get_verdict',
    args: [questionId],
  });
  console.log('Verdict:', result.verdict);
  console.log('Confidence:', result.confidence_score + '%');
  console.log('Rationale:', result.rationale);
}
```

### Solidity Consumer Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IVeriFeedOracle {
    struct OracleVerdict {
        uint256 id;
        string title;
        string status;
        string verdict;
        uint256 confidenceScoreBps;
        string rationale;
    }
    function get_verdict(uint256 questionId) external view returns (OracleVerdict memory);
}

contract PredictionMarketSettler {
    IVeriFeedOracle public oracle;

    constructor(address _oracle) {
        oracle = IVeriFeedOracle(_oracle);
    }

    function settle(uint256 questionId) external {
        IVeriFeedOracle.OracleVerdict memory v = oracle.get_verdict(questionId);
        require(keccak256(bytes(v.status)) == keccak256(bytes("FINALIZED")), "Pending");
        require(v.confidenceScoreBps >= 8000, "Low confidence");
        // Settle market pool based on v.verdict
    }
}
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/huy0x404/verifeed-oracle.git
cd verifeed-oracle

# Install dependencies
npm install

# Run Vite development server
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build
```

---

## 📋 GenLayer Project Submission Checklist (7/7)

- [x] **01. Identity:** VeriFeed Logo & Brand Mark, Primary Tag: `Oracles / Data`, Secondary: `Prediction Markets`, `AI Agents`
- [x] **02. Project Summary:** One-liner (122/180 chars)
- [x] **03. Project Overview:** Full description highlighting non-deterministic web crawling and equivalence consensus (926/1000 chars)
- [x] **04. Demo Video:** Walkthrough covering query creation, consensus round, and dispute escalation
- [x] **05. How-to Steps:** 5 interactive steps with live in-app test buttons
- [x] **06. Review Verification:** Expected outcome (308/500 chars) & Bradbury Explorer contract link
- [x] **07. Project Links & Evidence:** GitHub repository and live Vercel deployment link

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
