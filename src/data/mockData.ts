import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'vf-q-101',
    title: 'Which team won the 2024 UEFA Champions League final?',
    category: 'Sports',
    primaryTag: 'Oracles / Data',
    tags: ['Prediction Markets', 'Sports Fact Resolution'],
    outputFormat: 'text',
    createdAt: '2024-06-01T22:45:00Z',
    creatorAddress: '0x9B41c30Ef68940Ec7DbF067C1F2F2D185F3138b2',
    transactionHash: '0x3a4b9c1d8e7f6052846193720abced4f51938201a4bc82d0e7f91c34918274a1',
    blockNumber: 142095,
    status: 'FINALIZED',
    verdict: 'Real Madrid',
    confidenceScore: 99.4,
    rationale:
      'Official match records from UEFA and BBC Sport confirm Real Madrid defeated Borussia Dortmund 2-0 at Wembley Stadium on June 1, 2024, with goals from Dani Carvajal (74\') and Vinícius Júnior (83\'). The third submitted source (a football fan rumor blog) erroneously claimed Dortmund won 2-1 due to an alleged VAR annulment; validators evaluated domain authority, timestamps, and match timeline, reaching 100% equivalence consensus.',
    resolutionTimeMs: 4210,
    sources: [
      {
        id: 's-1',
        url: 'https://www.uefa.com/uefachampionsleague/match/2039971--dortmund-vs-real-madrid/',
        domain: 'uefa.com',
        title: 'UEFA Official Match Report: Dortmund 0-2 Real Madrid',
        claimedAnswer: 'Real Madrid won 2-0',
        reliability: 'High',
        status: 'agreed',
        snippet: 'Real Madrid secured their 15th European Cup with a 2-0 win over Borussia Dortmund at Wembley.',
        publishedDate: 'June 1, 2024',
      },
      {
        id: 's-2',
        url: 'https://www.bbc.com/sport/football/articles/c1wwz1q73n1o',
        domain: 'bbc.com',
        title: 'BBC Sport: Real Madrid crowned European champions for 15th time',
        claimedAnswer: 'Real Madrid won 2-0',
        reliability: 'High',
        status: 'agreed',
        snippet: 'Dani Carvajal and Vinicius Junior struck late as Real Madrid claimed victory over Dortmund.',
        publishedDate: 'June 1, 2024',
      },
      {
        id: 's-3',
        url: 'https://fanblog-fakesports-rumors.xyz/ucl-final-dispute-var',
        domain: 'fanblog-fakesports-rumors.xyz',
        title: 'FanZone Blog: Dortmund 2-1 Controversy and VAR Overturn Claim',
        claimedAnswer: 'Borussia Dortmund won 2-1',
        reliability: 'Low',
        status: 'conflicted',
        snippet: 'Controversial rumor claiming UEFA VAR had posthumously disallowed Real Madrid goals.',
        publishedDate: 'June 2, 2024',
      },
    ],
    validatorsConsensus: {
      totalValidators: 5,
      agreedCount: 5,
      disagreedCount: 0,
      equivalenceScore: 1.0,
      validatorVotes: [
        {
          validatorId: 'val-01',
          name: 'Atlas Validator Alpha',
          nodeAddress: '0x1F84c138D30E40EfA10E1a4F4f74d08F0a7e6bA1',
          model: 'Llama-3.3-70B-Instruct (GenLayer node)',
          vote: 'Real Madrid',
          confidence: 100,
          reasoning: 'Primary official sports federation source (uefa.com) and tier-1 wire (bbc.com) verify 2-0 score. The third source has low domain authority and fabricates VAR rules.',
          timestamp: '2024-06-01T22:45:18Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-02',
          name: 'Hyperion Node 4',
          nodeAddress: '0x882aB05C12984Fc747A46441D99fA85c6c063b51',
          model: 'DeepSeek-V3 (GenLayer node)',
          vote: 'Real Madrid',
          confidence: 99.8,
          reasoning: 'Clear factual concordance between UEFA official reporting and BBC. Third source is an unverified user blog contradictory to global sporting records.',
          timestamp: '2024-06-01T22:45:19Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-03',
          name: 'Beacon Node 09',
          nodeAddress: '0x334Ca0Ef60914c8E89Fa390A7B59F870A94F5E6c',
          model: 'Mistral-Large-2411 (GenLayer node)',
          vote: 'Real Madrid',
          confidence: 99.5,
          reasoning: 'Independent cross-referencing of match statistics confirm goals by Carvajal and Vinícius Jr.',
          timestamp: '2024-06-01T22:45:21Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-04',
          name: 'Titan Staking Validator',
          nodeAddress: '0x55E9F90a32517865Cb83944F35E170044b74e1d9',
          model: 'Llama-3.3-70B-Instruct (GenLayer node)',
          vote: 'Real Madrid',
          confidence: 99.9,
          reasoning: 'All official metrics point to Real Madrid 2 - 0 Dortmund. Equivalence test passed.',
          timestamp: '2024-06-01T22:45:22Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-05',
          name: 'Solon Equivalence Node',
          nodeAddress: '0x71cA9a08e6451675276e093cBff26759B4a8618B',
          model: 'Qwen-2.5-72B-Instruct (GenLayer node)',
          vote: 'Real Madrid',
          confidence: 99.0,
          reasoning: 'Cross-checked evidence streams. Fanblog disregarded as hallucinated hearsay.',
          timestamp: '2024-06-01T22:45:23Z',
          isEquivalenceAccepted: true,
        },
      ],
    },
    disputeHistory: [],
  },
  {
    id: 'vf-q-102',
    title: 'Did SpaceX successfully catch the Starship Flight 5 Super Heavy booster using the launch tower chopstick arms?',
    category: 'Science & Tech',
    primaryTag: 'Oracles / Data',
    tags: ['AI Agents', 'Breaking Events'],
    outputFormat: 'boolean',
    createdAt: '2024-10-13T13:30:00Z',
    creatorAddress: '0x438A73f9f743510eE02F8b2298F667e4e135D771',
    transactionHash: '0x7291a084ef7561829031cba47e9283719c81b29384759021a8c8e1928475103a',
    blockNumber: 158912,
    status: 'FINALIZED',
    verdict: 'Yes (Confirmed Booster Catch by Mechazilla)',
    confidenceScore: 99.7,
    rationale:
      'SpaceX launch telemetry broadcast and verified aerospace media (NASASpaceflight, Reuters) verified the Starship Flight 5 Super Heavy booster decelerated and was caught by the launch tower chopstick arms at Starbase, Texas on October 13, 2024 at 12:33 UTC. An initial unverified tweet claiming the booster diverted to the Gulf of Mexico was contradicted by visual confirmation and FAA telecommunication data.',
    resolutionTimeMs: 3820,
    sources: [
      {
        id: 's-201',
        url: 'https://www.spacex.com/launches/starship-flight-5/',
        domain: 'spacex.com',
        title: 'SpaceX Starship Flight 5 Launch & Catch Summary',
        claimedAnswer: 'Yes, caught by tower arms',
        reliability: 'High',
        status: 'agreed',
        snippet: 'Super Heavy initiated its boostback burn and was captured by the tower chopstick arms.',
        publishedDate: 'Oct 13, 2024',
      },
      {
        id: 's-202',
        url: 'https://www.reuters.com/technology/space/spacex-launches-fifth-starship-test-catches-booster-first-attempt-2024-10-13/',
        domain: 'reuters.com',
        title: 'Reuters: SpaceX catches giant Starship rocket booster on first attempt',
        claimedAnswer: 'Yes, caught by tower arms',
        reliability: 'High',
        status: 'agreed',
        snippet: 'SpaceX achieved a major engineering milestone by catching the returning first-stage booster with mechanical arms.',
        publishedDate: 'Oct 13, 2024',
      },
      {
        id: 's-203',
        url: 'https://x-social-feed-aggregator.com/post/987162381-booster-splash',
        domain: 'x-social-feed-aggregator.com',
        title: 'Social Stream: Speculative post claiming water splashdown diversion',
        claimedAnswer: 'No, diverted to water',
        reliability: 'Low',
        status: 'conflicted',
        snippet: 'Early rumor posted minutes prior to landing suggesting flight directors aborted the catch attempt.',
        publishedDate: 'Oct 13, 2024',
      },
    ],
    validatorsConsensus: {
      totalValidators: 3,
      agreedCount: 3,
      disagreedCount: 0,
      equivalenceScore: 1.0,
      validatorVotes: [
        {
          validatorId: 'val-01',
          name: 'Atlas Validator Alpha',
          nodeAddress: '0x1F84c138D30E40EfA10E1a4F4f74d08F0a7e6bA1',
          model: 'Llama-3.3-70B-Instruct (GenLayer node)',
          vote: 'Yes (Confirmed Booster Catch by Mechazilla)',
          confidence: 99.8,
          reasoning: 'Primary mission broadcast and Reuters corroborate exact Mechazilla pin catch.',
          timestamp: '2024-10-13T13:30:15Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-02',
          name: 'Hyperion Node 4',
          nodeAddress: '0x882aB05C12984Fc747A46441D99fA85c6c063b51',
          model: 'DeepSeek-V3 (GenLayer node)',
          vote: 'Yes (Booster caught successfully)',
          confidence: 99.5,
          reasoning: 'Tower arm capture validated through verified video timestamps and official SpaceX log.',
          timestamp: '2024-10-13T13:30:17Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-03',
          name: 'Beacon Node 09',
          nodeAddress: '0x334Ca0Ef60914c8E89Fa390A7B59F870A94F5E6c',
          model: 'Mistral-Large-2411 (GenLayer node)',
          vote: 'Yes (Mechazilla arms caught Super Heavy)',
          confidence: 99.9,
          reasoning: 'Semantic equivalence check matches True/Yes. Rumor dismissed.',
          timestamp: '2024-10-13T13:30:19Z',
          isEquivalenceAccepted: true,
        },
      ],
    },
    disputeHistory: [],
  },
  {
    id: 'vf-q-103',
    title: 'What was the Federal Reserve benchmark rate cut decision at the September 18, 2024 FOMC meeting?',
    category: 'Prediction Markets',
    primaryTag: 'Oracles / Data',
    tags: ['Prediction Markets', 'Financial Oracles'],
    outputFormat: 'text',
    createdAt: '2024-09-18T18:15:00Z',
    creatorAddress: '0x7a28Bc482810a9c84918e8471901B9302eE2611a',
    transactionHash: '0x819b48c1728392187a4194857291039847192837190283749102938475819384',
    blockNumber: 154120,
    status: 'FINALIZED',
    verdict: '50 basis points cut (to 4.75% - 5.00%)',
    confidenceScore: 99.9,
    rationale:
      'The Federal Reserve FOMC statement explicitly lowered the target range for the federal funds rate by 50 basis points (1/2 percentage point) to 4.75%–5.00%. Prior prediction market discussions were split between 25 bps and 50 bps, with some preview articles arguing for 25 bps. The official policy statement confirmed 50 bps.',
    resolutionTimeMs: 4100,
    sources: [
      {
        id: 's-301',
        url: 'https://www.federalreserve.gov/newsevents/pressreleases/monetary20240918a.htm',
        domain: 'federalreserve.gov',
        title: 'Federal Reserve Press Release: FOMC Statement Sept 18, 2024',
        claimedAnswer: '50 bps cut (4.75%-5.00%)',
        reliability: 'High',
        status: 'agreed',
        snippet: 'The Committee decided to lower the target range for the federal funds rate by 1/2 percentage point to 4-3/4 to 5 percent.',
        publishedDate: 'Sept 18, 2024',
      },
      {
        id: 's-302',
        url: 'https://www.wsj.com/economy/central-banking/fed-interest-rate-cut-decision-september-2024',
        domain: 'wsj.com',
        title: 'Wall Street Journal: Fed Cuts Rates by Half Percentage Point',
        claimedAnswer: '50 bps cut',
        reliability: 'High',
        status: 'agreed',
        snippet: 'The Federal Reserve kicked off its interest rate-cutting cycle with a aggressive half-percentage-point reduction.',
        publishedDate: 'Sept 18, 2024',
      },
      {
        id: 's-303',
        url: 'https://market-rumors-macro.org/pre-fomc-25bps-analyst-note',
        domain: 'market-rumors-macro.org',
        title: 'Macro Daily: Forecast and leak alleging only 25 bps cut approved',
        claimedAnswer: '25 bps cut',
        reliability: 'Low',
        status: 'conflicted',
        snippet: 'Analyst speculative memo predicting a cautious 25 basis point adjustment published prior to statement.',
        publishedDate: 'Sept 18, 2024',
      },
    ],
    validatorsConsensus: {
      totalValidators: 3,
      agreedCount: 3,
      disagreedCount: 0,
      equivalenceScore: 1.0,
      validatorVotes: [
        {
          validatorId: 'val-01',
          name: 'Atlas Validator Alpha',
          nodeAddress: '0x1F84c138D30E40EfA10E1a4F4f74d08F0a7e6bA1',
          model: 'Llama-3.3-70B-Instruct (GenLayer node)',
          vote: '50 bps cut (4.75% - 5.00%)',
          confidence: 100,
          reasoning: 'Primary press release from federalreserve.gov definitively confirms 50 bps.',
          timestamp: '2024-09-18T18:15:10Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-02',
          name: 'Hyperion Node 4',
          nodeAddress: '0x882aB05C12984Fc747A46441D99fA85c6c063b51',
          model: 'DeepSeek-V3 (GenLayer node)',
          vote: '50 basis points reduction',
          confidence: 99.8,
          reasoning: 'FOMC statement overrides all pre-release analyst conjecture.',
          timestamp: '2024-09-18T18:15:12Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-03',
          name: 'Beacon Node 09',
          nodeAddress: '0x334Ca0Ef60914c8E89Fa390A7B59F870A94F5E6c',
          model: 'Mistral-Large-2411 (GenLayer node)',
          vote: '50 bps cut',
          confidence: 100,
          reasoning: 'Equivalence principle passes: 50 bps == 0.50% == half percentage point.',
          timestamp: '2024-09-18T18:15:13Z',
          isEquivalenceAccepted: true,
        },
      ],
    },
    disputeHistory: [],
  },
  {
    id: 'vf-q-104',
    title: 'Did the 2024 CrowdStrike software update cause an outage affecting Apple macOS computers?',
    category: 'Crypto & Web3',
    primaryTag: 'Oracles / Data',
    tags: ['AI Agents', 'Tech Fact Resolution'],
    outputFormat: 'boolean',
    createdAt: '2024-07-19T14:00:00Z',
    creatorAddress: '0x228F47891823101EAb847190391A470298B94021',
    transactionHash: '0x5519481902837491028394857192837491029384758193847192837491029384',
    blockNumber: 147820,
    status: 'FINALIZED',
    verdict: 'No (Affected Windows systems only, not macOS or Linux)',
    confidenceScore: 98.9,
    rationale:
      'CrowdStrike official post-incident review and Microsoft security telemetry confirmed the July 19, 2024 Falcon sensor Channel File 291 logic error exclusively triggered blue screens on Microsoft Windows systems. A viral TikTok and social media thread claimed Mac laptops were crashing, but technical forensic reports proved macOS and Linux hosts were completely unaffected.',
    resolutionTimeMs: 3600,
    sources: [
      {
        id: 's-401',
        url: 'https://www.crowdstrike.com/blog/falcon-update-for-windows-hosts-technical-details/',
        domain: 'crowdstrike.com',
        title: 'CrowdStrike Technical Details: Windows Sensor File 291 Issue',
        claimedAnswer: 'No, Windows only',
        reliability: 'High',
        status: 'agreed',
        snippet: 'This issue does not affect Mac or Linux hosts. It is not a cyberattack. The issue was identified and a fix deployed.',
        publishedDate: 'July 20, 2024',
      },
      {
        id: 's-402',
        url: 'https://www.reuters.com/technology/crowdstrike-update-caused-global-tech-chaos-windows-systems-2024-07-19/',
        domain: 'reuters.com',
        title: 'Reuters: Global tech outage hits Windows devices running CrowdStrike',
        claimedAnswer: 'No, Windows devices only',
        reliability: 'High',
        status: 'agreed',
        snippet: 'Systems running Apple macOS and open-source Linux remained functional throughout the incident.',
        publishedDate: 'July 19, 2024',
      },
      {
        id: 's-403',
        url: 'https://social-viral-threads.tech/macbook-blue-screen-panic-claim',
        domain: 'social-viral-threads.tech',
        title: 'TechBuzz Rumor: Mac users claiming kernel panics from Falcon',
        claimedAnswer: 'Yes, macOS was hit',
        reliability: 'Low',
        status: 'conflicted',
        snippet: 'Anecdotal social media posts falsely associating unrelated Mac restarts with the CrowdStrike Windows incident.',
        publishedDate: 'July 19, 2024',
      },
    ],
    validatorsConsensus: {
      totalValidators: 3,
      agreedCount: 3,
      disagreedCount: 0,
      equivalenceScore: 1.0,
      validatorVotes: [
        {
          validatorId: 'val-01',
          name: 'Atlas Validator Alpha',
          nodeAddress: '0x1F84c138D30E40EfA10E1a4F4f74d08F0a7e6bA1',
          model: 'Llama-3.3-70B-Instruct (GenLayer node)',
          vote: 'No (Affected Windows systems only)',
          confidence: 99.5,
          reasoning: 'CrowdStrike security advisory explicitly states macOS and Linux were unaffected.',
          timestamp: '2024-07-19T14:00:12Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-02',
          name: 'Hyperion Node 4',
          nodeAddress: '0x882aB05C12984Fc747A46441D99fA85c6c063b51',
          model: 'DeepSeek-V3 (GenLayer node)',
          vote: 'No (False claim, Windows only)',
          confidence: 98.8,
          reasoning: 'Channel file 291 was targeted exclusively at the Windows kernel filter driver.',
          timestamp: '2024-07-19T14:00:15Z',
          isEquivalenceAccepted: true,
        },
        {
          validatorId: 'val-03',
          name: 'Beacon Node 09',
          nodeAddress: '0x334Ca0Ef60914c8E89Fa390A7B59F870A94F5E6c',
          model: 'Mistral-Large-2411 (GenLayer node)',
          vote: 'No (macOS unaffected)',
          confidence: 99.0,
          reasoning: 'Equivalence verified: Boolean False / Negative response.',
          timestamp: '2024-07-19T14:00:16Z',
          isEquivalenceAccepted: true,
        },
      ],
    },
    disputeHistory: [],
  },
];

export const CONTRACT_PYTHON_SOURCE = `# ==============================================================================
# VeriFeed: Conflict-Resolving Intelligent Oracle
# Framework: GenLayer Intelligent Contract (Python SDK)
# Network: GenLayer Bradbury Testnet
# ==============================================================================

import json

class VeriFeedOracle:
    """
    Intelligent Contract running directly on GenLayer validators.
    Uses non-deterministic web fetching and LLM reasoning to resolve
    conflicting data sources into a deterministic consensus verdict.
    """

    def __init__(self):
        # Initialized with contract deployer
        self.steward = gl.message.sender
        self.question_count = 0
        self.questions = {}
        self.min_stake_dispute = 50 * (10 ** 18)  # 50 GEN

    def create_question(
        self,
        title: str,
        sources_json: str,
        output_format: str,
        category: str
    ) -> int:
        """
        Creates a new question record with 2-5 candidate web source URLs.
        Emits resolution request for GenLayer validators.
        """
        assert len(title) > 10, "Question title too short"
        sources = json.loads(sources_json)
        assert len(sources) >= 2, "Must provide at least 2 sources to resolve conflicts"
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
            "source_status": {},
            "dispute_round": 1
        }

        # Trigger immediate consensus resolution round
        self._resolve_internal(q_id)
        return q_id

    def _resolve_internal(self, q_id: int):
        """
        Internal resolution logic executing across GenLayer validator nodes.
        Uses gl.get_webpage to read live URLs and gl.exec_prompt for LLM reasoning.
        """
        q = self.questions[q_id]
        evidence_bundle = []

        # Step 1: GenLayer Non-Deterministic Web Ingestion
        # Each validator independently retrieves each source URL
        for source in q["sources"]:
            try:
                page_text = gl.get_webpage(source["url"])
                # Extract clean snippet and facts
                evidence_bundle.append({
                    "url": source["url"],
                    "domain": source.get("domain", ""),
                    "content": page_text[:4000] # First 4k chars of body
                })
            except Exception as e:
                evidence_bundle.append({
                    "url": source["url"],
                    "error": str(e)
                })

        # Step 2: Validator LLM Reasoning & Conflict Synthesis
        prompt = f"""
        You are a GenLayer Validator judging an on-chain oracle question.
        Question: {q["title"]}
        Output Format Required: {q["output_format"]}

        Below are the fetched raw source contents:
        {json.dumps(evidence_bundle, indent=2)}

        Tasks:
        1. Determine if the sources conflict with one another.
        2. Identify credible official records vs speculative blogs or unverified rumors.
        3. Formulate the single ground-truth answer.
        4. Provide an integer confidence score from 0 to 100.
        5. Explain the rationale and tag each source as 'agreed' or 'conflicted'.

        Return ONLY a JSON object with:
        {{
            "verdict": "string",
            "confidence": 99.5,
            "rationale": "detailed explanation of conflict resolution",
            "source_status": {{"<url>": "agreed" | "conflicted"}}
        }}
        """

        # Step 3: LLM Execution
        result_json_str = gl.exec_prompt(prompt)
        result = json.loads(result_json_str)

        # Step 4: Equivalence Principle Check
        # GenLayer ensures validator results match semantically
        eq_check_prompt = f"""
        Compare the resolved verdict: '{result["verdict"]}'
        against the core evidence. Does this represent a fair, truthful resolution?
        """
        is_equivalent = gl.eq_principle_prompt_llm(eq_check_prompt)
        assert is_equivalent, "Consensus failed equivalence principle check"

        # Step 5: Finalize state
        q["verdict"] = result["verdict"]
        q["confidence_score"] = float(result.get("confidence", 95.0))
        q["rationale"] = result["rationale"]
        q["source_status"] = result.get("source_status", {})
        q["status"] = "FINALIZED"

    def dispute_question(self, q_id: int, new_sources_json: str):
        """
        Allows anyone to dispute a finalized verdict by posting a stake
        and providing additional counter-evidence sources.
        """
        assert gl.message.value >= self.min_stake_dispute, "Insufficient dispute stake"
        assert q_id in self.questions, "Question not found"
        q = self.questions[q_id]

        new_sources = json.loads(new_sources_json)
        assert len(new_sources) >= 1, "Must add at least 1 counter-source"

        q["sources"].extend(new_sources)
        q["status"] = "DISPUTED"
        q["dispute_round"] += 1

        # Re-run validator consensus with augmented evidence set
        self._resolve_internal(q_id)

    def get_verdict(self, q_id: int) -> dict:
        """
        Public view function called by consumer smart contracts or frontends.
        """
        assert q_id in self.questions, "Question not found"
        q = self.questions[q_id]
        return {
            "id": q["id"],
            "title": q["title"],
            "status": q["status"],
            "verdict": q["verdict"],
            "confidence_score": q["confidence_score"],
            "rationale": q["rationale"]
        }
`;

export const CONSUMER_CONTRACT_SOLIDITY = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PredictionMarketConsumer
 * @notice Example smart contract consuming VeriFeed Conflict-Resolving Oracle on GenLayer
 */
interface IVeriFeedOracle {
    struct OracleVerdict {
        uint256 id;
        string title;
        string status;
        string verdict;
        uint256 confidenceScoreBps; // 10000 = 100%
        string rationale;
    }

    function get_verdict(uint256 questionId) external view returns (OracleVerdict memory);
}

contract GenLayerPredictionMarket {
    IVeriFeedOracle public immutable verifeed;
    uint256 public immutable oracleQuestionId;
    address public winner;
    bool public isSettled;

    event MarketResolved(string indexed verdict, uint256 confidenceScore);

    constructor(address _verifeedOracle, uint256 _oracleQuestionId) {
        verifeed = IVeriFeedOracle(_verifeedOracle);
        oracleQuestionId = _oracleQuestionId;
    }

    function settleMarket() external {
        require(!isSettled, "Market already settled");
        
        IVeriFeedOracle.OracleVerdict memory v = verifeed.get_verdict(oracleQuestionId);
        require(
            keccak256(bytes(v.status)) == keccak256(bytes("FINALIZED")),
            "VeriFeed oracle resolution still pending"
        );
        require(v.confidenceScoreBps >= 8000, "Confidence below 80% threshold");

        isSettled = true;
        emit MarketResolved(v.verdict, v.confidenceScoreBps);
    }
}
`;

export const TS_SDK_SNIPPET = `import { createClient } from 'genlayer-js';

// 1. Initialize GenLayer client pointing to Bradbury Testnet
const client = createClient({
  endpoint: 'https://rpc-bradbury.genlayer.com',
});

// 2. Instantiate VeriFeed Intelligent Contract
const VERIFEED_CONTRACT_ADDRESS = '0x8a927cD5E4D1A456F26E652391054C345Fe490B6';

// 3. Query resolved verdict with confidence & rationale
async function queryOracle(questionId: number) {
  const result = await client.readContract({
    address: VERIFEED_CONTRACT_ADDRESS,
    functionName: 'get_verdict',
    args: [questionId],
  });

  console.log('Final Verdict:', result.verdict);
  console.log('Confidence:', result.confidence_score + '%');
  console.log('Consensus Rationale:', result.rationale);
  return result;
}

// 4. Create a new question with conflicting sources
async function submitQuestionWithSources() {
  const tx = await client.writeContract({
    address: VERIFEED_CONTRACT_ADDRESS,
    functionName: 'create_question',
    args: [
      'Who won the 2024 UEFA Champions League final?',
      JSON.stringify([
        { url: 'https://www.uefa.com/uefachampionsleague/match/2039971' },
        { url: 'https://www.bbc.com/sport/football/articles/c1wwz1q73n1o' },
        { url: 'https://fanblog-fakesports-rumors.xyz/ucl-final' }
      ]),
      'text',
      'Sports'
    ],
  });
  console.log('Transaction hash:', tx.hash);
}
`;
