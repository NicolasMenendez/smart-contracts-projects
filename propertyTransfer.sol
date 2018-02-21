pragma solidity ^0.4.0;

contract propertyTransfer {
   
    struct property {
        address owner;
        address prevOwner;
        uint salePrice;
        string propertyInformation;
        
    }
    
    uint numProperties;
    mapping (uint => property) public properties;
    
    address public propertyAssigner;
     
    modifier onlyAssigner() {
        if(msg.sender != propertyAssigner){
            Error1(msg.sender,'You need to be the property Assigner to add a new property or assign a property');
            return;
        }
        _;
    }
 
     event Error1(address sender,string error);

    function newProperty (string propertyInformation,uint propertyCost)onlyAssigner returns (uint propertyID)
      {
         propertyID = numProperties++;
        
         properties[propertyID] = property(msg.sender,msg.sender,propertyCost,propertyInformation);
         
         NewProp(propertyID, msg.sender,propertyInformation,propertyCost); 
         
     }
     
     
    event NewProp(uint propID, address from, string propertyInformation,uint propertyCost);
    event Assign(uint propID, address from, address to,uint salePrice);
    event PropTransfer(uint propID,address from,address to,uint salePrice);
   
    function propertyTransfer() {
        propertyAssigner = msg.sender;
    }
    
   function assignProperty (uint propertyID, address receiver)onlyAssigner 
   {
        properties[propertyID].owner = receiver;
        properties[propertyID].prevOwner = msg.sender;
        uint salePrice = properties[propertyID].salePrice; 
        Assign(propertyID, msg.sender,receiver,salePrice);
    }
    
    function transferProperty (uint propertyID, address receiver,uint salePrice) {
        if (msg.sender != properties[propertyID].owner){
             Error1(msg.sender,'You need to be the owner of the property to make a transfer');
             return;
            }
        properties[propertyID].owner = receiver;
        properties[propertyID].prevOwner = msg.sender;
        properties[propertyID].salePrice = salePrice;
        PropTransfer(propertyID,msg.sender,receiver,salePrice);
        
    }
    


}
