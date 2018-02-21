var abi;
var myContractInstance;
var MyContract;
function startApp(abi2,MyContract2,myContractInstance2){
		console.error("startup");
	    abi=abi2;
	    MyContract=MyContract2;
	    myContractInstance=myContractInstance2;
}

function PropertyInformation(){
   this.propertyInfoVariables = [];
}
PropertyInformation.prototype.addVar = function(variable){
   this.propertyInfoVariables.push(variable);
}
PropertyInformation.prototype.toString = function(){
   var result = '';
   for(var i in this.propertyInfoVariables)
       result += this.propertyInfoVariables[i] + ';';
   return result;
}

function addProperty(){ 
	var streetName = document.getElementById('streetName').value;
	var streetNumber = document.getElementById('streetNumber').value;
	var village = document.getElementById('village').value;
	var cityOrTown = document.getElementById('cityOrTown').value;
	var zipCode = document.getElementById('zipCode').value;
	var landSize = document.getElementById('landSize').value;
	var buildingSize = document.getElementById('buildingSize').value;
	var propertyType = document.getElementById('propertyType').value;
	var numberOfBeds = document.getElementById('numberOfBeds').value;
	var numberOfBaths = document.getElementById('numberOfBaths').value;
	var parcel = document.getElementById('parcel').value;
	var description = document.getElementById('description').value;
	var propertyCost = document.getElementById('propertyCost').value

var propertyInformation = new PropertyInformation();
propertyInformation.addVar(streetName);
propertyInformation.addVar(streetNumber);
propertyInformation.addVar(village);
propertyInformation.addVar(cityOrTown);
propertyInformation.addVar(zipCode);
propertyInformation.addVar(landSize);
propertyInformation.addVar(buildingSize);
propertyInformation.addVar(propertyType);
propertyInformation.addVar(propertyCost);
propertyInformation.addVar(numberOfBeds);
propertyInformation.addVar(numberOfBaths);
propertyInformation.addVar(parcel);
propertyInformation.addVar(description);

var propertyInfoAsString = propertyInformation.toString();


	var newProperty = myContractInstance.newProperty(propertyInfoAsString,propertyCost,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.NewProp({},function(error, result) {
		  if (!error) {
			    var msg = " new propety ID:  " +result.args.propID +" by property assigner:  " + result.args.from + " Property Information:  " + result.args.propertyInformation + " Property Cost:  " + result.args.propertyCost;
			    document.getElementById('callback').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
	 var event1 = myContractInstance.Error1({},function(error, result) {
		  if (!error) {
			    var msg =  result.args.sender + " " +  result.args.error;
			    document.getElementById('callback').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}



function assignProperty(){

	var receiverAdd = document.getElementById('receiverAdd1').value;
	var propertyId = document.getElementById('propertyId1').value;
	
	var assignProperty = myContractInstance.assignProperty(propertyId,receiverAdd,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.Assign({},function(error, result) {
		  if (!error) {
			    var msg = result.args.from +" assing Property with ID:  " + result.args.propID + " to new owner " + result.args.to + " Sale price: " + result.args.salePrice;
			    document.getElementById('callback1').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
		 var event1 = myContractInstance.Error1({},function(error, result) {
		  if (!error) {
			    var msg =  result.args.sender + " " +  result.args.error;
			    document.getElementById('callback1').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}


function transferProperty(){
	var receiverAdd = document.getElementById('receiverAdd2').value;
	var propertyId = document.getElementById('propertyId2').value;
	var salePrice = document.getElementById('salePrice').value;
	var transferProperty = myContractInstance.transferProperty(propertyId,receiverAdd,salePrice,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.PropTransfer({},function(error, result) {
		  if (!error) {
			    var msg = result.args.from +" transfer Property with ID:  " + result.args.propID + " to new owner " + result.args.to+ " salePrice " + result.args.salePrice;
			    document.getElementById('callback2').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
		 var event1 = myContractInstance.Error1({},function(error, result) {
		  if (!error) {
			    var msg =  result.args.sender + " " + result.args.error;
			    document.getElementById('callback2').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}


//function checkBalance(){
	//var checkBalAdd = document.getElementById('checkBalAdd').value;
	//var sendCoin = myContractInstance.balances(checkBalAdd,function(err,res){
		//if(err){
			//console.log(err);
		//} else {
			//document.getElementById('balanceCallback').innerHTML = ""+res;
			//console.log(res);
		//}
	//});
//}


//// Next step

var op = []
function handleAllNewPropertiesEvent(){

	var allEvents = myContractInstance.NewProp({},{fromBlock: 1700000, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.from +" add a new property with id: " + result.args.propID + " Property information: "+ result.args.propertyInformation +" Property Cost:  " + result.args.propertyCost;
				    document.getElementById('AllnewProperties').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 

	
	allEvents.stopWatching();
	
}
function handleAllPropertyAssignationEvent(){

	var allEvents = myContractInstance.Assign({},{fromBlock: 1700000, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.from +" assign property with id: " + result.args.propID + " to new owner: "+ result.args.to +" Sale Price:  " + result.args.salePrice;
				    document.getElementById('AllPropertyAssignations').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 

	
	allEvents.stopWatching();
	
}
function handleAllPropertyTransferEvent(){

	var allEvents = myContractInstance.PropTransfer({},{fromBlock: 1700000, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.from +" transfer property with id: " + result.args.propID + " to new owner: "+ result.args.to +" Sale Price:  " + result.args.salePrice;
				    document.getElementById('AlltransferProperties').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 

	
	allEvents.stopWatching();
	
}



////next step
//function handleAllEvent(){
////	get the whole list of the events... 
	//var allEvents = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'},function(error, result) {
		  //if (!error) {
			  //var d = new Date(0);
			  //d.setUTCSeconds(result.args._now); 
			    //var msg = result.args._msg +" with Dr. " + (result.args._doctor) + " \n for patient " + result.args._patient +  
			    //" in "+result.args._amount +"wei .  \n Its block no is " + result.blockNumber + " ." +
			    //" \n The appointment id is \""+ (result.args._appointmentId)  +"\"  \n  at time = "+ 
			    //(new Date(d));
			    //document.getElementById('callback2').innerHTML += "<hr/>"+msg;
			    //op.push(msg)
			    //console.log(msg);
			    //console.log(op);
		  //}
		  //else {
			  //console.error(error);
		  //} 
	//}); 
	
	//// would get all past logs again.
	
	//allEvents.stopWatching();

	
//}





//function handleServiceProvidedEvent(){
	//var patientId1 = document.getElementById('patientId_2').value;
	//var docId1 = document.getElementById('docId_2').value;
	//var allEvents = myContractInstance.ServiceProvided({_patient:patientId1, _doctor: docId1},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  //if (!error) {
				  //var d = new Date(0);
				  //d.setUTCSeconds(result.args._now); 
				    //var msg = result.args._msg +" with Dr. " + (result.args._doctor) + " \n for patient " + result.args._patient +  
				    //" in "+result.args._amount +"wei .  \n Its block no is " + result.blockNumber + " ." +
				    //" \n The appointment id is \""+ (result.args._appointmentId)  +"\"  \n  at time = "+ 
				    //(new Date(d));
				    //document.getElementById('callback2').innerHTML += "<hr/>"+msg;
////				    op.push(msg)
				    //console.log(msg);
			  //}
			  //else {
				  //console.error(error);
			  //} 
		//}); 

//// would get all past logs again.

		//allEvents.stopWatching();
	
//}
