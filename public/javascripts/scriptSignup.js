document.addEventListener('DOMContentLoaded', () => {
    console.log('Script del Signup');
  })
  document.getElementById('role').addEventListener("change", function(){
    var role = document.getElementById('role').value;
    console.log(role);
      if(role==='psychologist'){
        document.getElementById('psychDiv').className="show";
        document.getElementById('medicalLicenseNumber').type = 'text'; 
        document.getElementById('university1').type = 'text'; 
        document.getElementById('university2').type = 'text'; 
        document.getElementById('experience').type = 'text'; 
      }else{
        document.getElementById('psychDiv').className="hidden";

      }  
  });