// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureValueVault is SepoliaConfig {
    using FHE for *;
    
    struct PropertyValuation {
        euint32 propertyId;
        euint32 estimatedValue;
        euint32 marketValue;
        euint32 riskScore;
        bool isVerified;
        bool isActive;
        string propertyAddress;
        string propertyType;
        address owner;
        address appraiser;
        uint256 timestamp;
        uint256 lastUpdated;
    }
    
    struct ValuationRequest {
        euint32 requestId;
        euint32 propertyId;
        euint32 requestedValue;
        bool isProcessed;
        bool isApproved;
        string requestDetails;
        address requester;
        address appraiser;
        uint256 timestamp;
        uint256 deadline;
    }
    
    struct AppraisalReport {
        euint32 reportId;
        euint32 propertyId;
        euint32 finalValue;
        euint32 confidenceScore;
        euint32 marketTrends;
        bool isVerified;
        string reportHash;
        string methodology;
        address appraiser;
        uint256 timestamp;
    }
    
    struct UserProfile {
        euint32 reputationScore;
        euint32 totalValuations;
        euint32 successfulValuations;
        bool isVerified;
        bool isActive;
        string profileHash;
        address userAddress;
        uint256 joinDate;
        uint256 lastActivity;
    }
    
    mapping(uint256 => PropertyValuation) public propertyValuations;
    mapping(uint256 => ValuationRequest) public valuationRequests;
    mapping(uint256 => AppraisalReport) public appraisalReports;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public appraiserReputation;
    
    uint256 public propertyCounter;
    uint256 public requestCounter;
    uint256 public reportCounter;
    
    address public owner;
    address public verifier;
    address public feeCollector;
    
    euint32 public platformFee; // Encrypted fee percentage
    euint32 public minimumReputation; // Minimum reputation to participate
    
    event PropertyValuationCreated(uint256 indexed propertyId, address indexed owner, string propertyAddress);
    event ValuationRequested(uint256 indexed requestId, uint256 indexed propertyId, address indexed requester);
    event AppraisalReported(uint256 indexed reportId, uint256 indexed propertyId, address indexed appraiser);
    event PropertyVerified(uint256 indexed propertyId, bool isVerified);
    event UserReputationUpdated(address indexed user, uint32 reputation);
    event AppraiserReputationUpdated(address indexed appraiser, uint32 reputation);
    event FeeCollected(address indexed from, uint32 amount);
    
    constructor(address _verifier, address _feeCollector) {
        owner = msg.sender;
        verifier = _verifier;
        feeCollector = _feeCollector;
        
        // Initialize encrypted values
        platformFee = FHE.asEuint32(250); // 2.5% fee (250 basis points)
        minimumReputation = FHE.asEuint32(100); // Minimum reputation score
    }
    
    function createPropertyValuation(
        string memory _propertyAddress,
        string memory _propertyType,
        externalEuint32 _estimatedValue,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_propertyAddress).length > 0, "Property address cannot be empty");
        require(bytes(_propertyType).length > 0, "Property type cannot be empty");
        
        uint256 propertyId = propertyCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalEstimatedValue = FHE.fromExternal(_estimatedValue, inputProof);
        
        propertyValuations[propertyId] = PropertyValuation({
            propertyId: FHE.asEuint32(0), // Will be set properly later
            estimatedValue: internalEstimatedValue,
            marketValue: FHE.asEuint32(0),
            riskScore: FHE.asEuint32(0),
            isVerified: false,
            isActive: true,
            propertyAddress: _propertyAddress,
            propertyType: _propertyType,
            owner: msg.sender,
            appraiser: address(0),
            timestamp: block.timestamp,
            lastUpdated: block.timestamp
        });
        
        emit PropertyValuationCreated(propertyId, msg.sender, _propertyAddress);
        return propertyId;
    }
    
    function requestValuation(
        uint256 propertyId,
        externalEuint32 _requestedValue,
        string memory _requestDetails,
        uint256 _deadline,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(propertyValuations[propertyId].owner != address(0), "Property does not exist");
        require(propertyValuations[propertyId].isActive, "Property is not active");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 requestId = requestCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalRequestedValue = FHE.fromExternal(_requestedValue, inputProof);
        
        valuationRequests[requestId] = ValuationRequest({
            requestId: FHE.asEuint32(0), // Will be set properly later
            propertyId: FHE.asEuint32(propertyId),
            requestedValue: internalRequestedValue,
            isProcessed: false,
            isApproved: false,
            requestDetails: _requestDetails,
            requester: msg.sender,
            appraiser: address(0),
            timestamp: block.timestamp,
            deadline: _deadline
        });
        
        emit ValuationRequested(requestId, propertyId, msg.sender);
        return requestId;
    }
    
    function submitAppraisalReport(
        uint256 propertyId,
        uint256 requestId,
        externalEuint32 _finalValue,
        externalEuint32 _confidenceScore,
        externalEuint32 _marketTrends,
        string memory _reportHash,
        string memory _methodology,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(propertyValuations[propertyId].owner != address(0), "Property does not exist");
        require(valuationRequests[requestId].requester != address(0), "Request does not exist");
        require(!valuationRequests[requestId].isProcessed, "Request already processed");
        require(block.timestamp <= valuationRequests[requestId].deadline, "Request deadline passed");
        
        uint256 reportId = reportCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalFinalValue = FHE.fromExternal(_finalValue, inputProof);
        euint32 internalConfidenceScore = FHE.fromExternal(_confidenceScore, inputProof);
        euint32 internalMarketTrends = FHE.fromExternal(_marketTrends, inputProof);
        
        appraisalReports[reportId] = AppraisalReport({
            reportId: FHE.asEuint32(0), // Will be set properly later
            propertyId: FHE.asEuint32(propertyId),
            finalValue: internalFinalValue,
            confidenceScore: internalConfidenceScore,
            marketTrends: internalMarketTrends,
            isVerified: false,
            reportHash: _reportHash,
            methodology: _methodology,
            appraiser: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update property valuation
        propertyValuations[propertyId].marketValue = internalFinalValue;
        propertyValuations[propertyId].appraiser = msg.sender;
        propertyValuations[propertyId].lastUpdated = block.timestamp;
        
        // Mark request as processed
        valuationRequests[requestId].isProcessed = true;
        valuationRequests[requestId].appraiser = msg.sender;
        
        emit AppraisalReported(reportId, propertyId, msg.sender);
        return reportId;
    }
    
    function verifyProperty(uint256 propertyId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify properties");
        require(propertyValuations[propertyId].owner != address(0), "Property does not exist");
        
        propertyValuations[propertyId].isVerified = isVerified;
        emit PropertyVerified(propertyId, isVerified);
    }
    
    function verifyAppraisalReport(uint256 reportId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify reports");
        require(appraisalReports[reportId].appraiser != address(0), "Report does not exist");
        
        appraisalReports[reportId].isVerified = isVerified;
    }
    
    function updateUserReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit UserReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function updateAppraiserReputation(address appraiser, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(appraiser != address(0), "Invalid appraiser address");
        
        appraiserReputation[appraiser] = reputation;
        emit AppraiserReputationUpdated(appraiser, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function createUserProfile(string memory _profileHash) public {
        require(userProfiles[msg.sender].userAddress == address(0), "Profile already exists");
        
        userProfiles[msg.sender] = UserProfile({
            reputationScore: FHE.asEuint32(100), // Initial reputation
            totalValuations: FHE.asEuint32(0),
            successfulValuations: FHE.asEuint32(0),
            isVerified: false,
            isActive: true,
            profileHash: _profileHash,
            userAddress: msg.sender,
            joinDate: block.timestamp,
            lastActivity: block.timestamp
        });
    }
    
    function getPropertyInfo(uint256 propertyId) public view returns (
        string memory propertyAddress,
        string memory propertyType,
        uint8 estimatedValue,
        uint8 marketValue,
        uint8 riskScore,
        bool isVerified,
        bool isActive,
        address owner,
        address appraiser,
        uint256 timestamp,
        uint256 lastUpdated
    ) {
        PropertyValuation storage property = propertyValuations[propertyId];
        return (
            property.propertyAddress,
            property.propertyType,
            0, // FHE.decrypt(property.estimatedValue) - will be decrypted off-chain
            0, // FHE.decrypt(property.marketValue) - will be decrypted off-chain
            0, // FHE.decrypt(property.riskScore) - will be decrypted off-chain
            property.isVerified,
            property.isActive,
            property.owner,
            property.appraiser,
            property.timestamp,
            property.lastUpdated
        );
    }
    
    function getValuationRequestInfo(uint256 requestId) public view returns (
        uint8 propertyId,
        uint8 requestedValue,
        bool isProcessed,
        bool isApproved,
        string memory requestDetails,
        address requester,
        address appraiser,
        uint256 timestamp,
        uint256 deadline
    ) {
        ValuationRequest storage request = valuationRequests[requestId];
        return (
            0, // FHE.decrypt(request.propertyId) - will be decrypted off-chain
            0, // FHE.decrypt(request.requestedValue) - will be decrypted off-chain
            request.isProcessed,
            request.isApproved,
            request.requestDetails,
            request.requester,
            request.appraiser,
            request.timestamp,
            request.deadline
        );
    }
    
    function getAppraisalReportInfo(uint256 reportId) public view returns (
        uint8 propertyId,
        uint8 finalValue,
        uint8 confidenceScore,
        uint8 marketTrends,
        bool isVerified,
        string memory reportHash,
        string memory methodology,
        address appraiser,
        uint256 timestamp
    ) {
        AppraisalReport storage report = appraisalReports[reportId];
        return (
            0, // FHE.decrypt(report.propertyId) - will be decrypted off-chain
            0, // FHE.decrypt(report.finalValue) - will be decrypted off-chain
            0, // FHE.decrypt(report.confidenceScore) - will be decrypted off-chain
            0, // FHE.decrypt(report.marketTrends) - will be decrypted off-chain
            report.isVerified,
            report.reportHash,
            report.methodology,
            report.appraiser,
            report.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getAppraiserReputation(address appraiser) public view returns (uint8) {
        return 0; // FHE.decrypt(appraiserReputation[appraiser]) - will be decrypted off-chain
    }
    
    function calculateRiskScore(
        externalEuint32 _propertyValue,
        externalEuint32 _marketVolatility,
        externalEuint32 _locationScore,
        bytes calldata inputProof
    ) public returns (euint32) {
        // Convert external values to internal
        euint32 propertyValue = FHE.fromExternal(_propertyValue, inputProof);
        euint32 marketVolatility = FHE.fromExternal(_marketVolatility, inputProof);
        euint32 locationScore = FHE.fromExternal(_locationScore, inputProof);
        
        // Simple risk calculation (can be made more complex)
        // Risk = (Market Volatility * 0.4) + ((100 - Location Score) * 0.3) + (Property Value / 1000000 * 0.3)
        euint32 riskFromVolatility = FHE.mul(marketVolatility, FHE.asEuint32(40));
        euint32 riskFromLocation = FHE.mul(FHE.sub(FHE.asEuint32(100), locationScore), FHE.asEuint32(30));
        euint32 riskFromValue = FHE.div(propertyValue, FHE.asEuint32(1000000));
        riskFromValue = FHE.mul(riskFromValue, FHE.asEuint32(30));
        
        euint32 totalRisk = FHE.add(riskFromVolatility, riskFromLocation);
        totalRisk = FHE.add(totalRisk, riskFromValue);
        
        return totalRisk;
    }
    
    function withdrawFees() public {
        require(msg.sender == feeCollector, "Only fee collector can withdraw");
        // Transfer accumulated fees to fee collector
        // Implementation depends on how fees are collected
    }
    
    function updatePlatformFee(euint32 newFee) public {
        require(msg.sender == owner, "Only owner can update fee");
        platformFee = newFee;
    }
    
    function updateMinimumReputation(euint32 newMinimum) public {
        require(msg.sender == owner, "Only owner can update minimum reputation");
        minimumReputation = newMinimum;
    }
}
