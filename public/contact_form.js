const showEmailResult = async(e) => {
    e.preventDefault();

    const sent = document.getElementById("sent");
    sent.innerHTML="";
    const result = document.createElement("p");
    result.innerHTML = "Please wait....";
    result.style.backgroundColor = "#e3e3a4";
    sent.appendChild(result);
    let response = await getEmailResult();

    if(response.status == 200){
        result.innerHTML = "Email successfully sent";
        result.style.backgroundColor = "#D4EDDA";
    } else {
        result.innerHTML = "Sorry, your email was not sent";
        result.style.backgroundColor = "#dd8d8d";
    }

    sent.appendChild(result);

};

const getEmailResult = async() => {
    const form = document.getElementById("contact-form");
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            body:json
        });

        return response;
    } catch(error){
        console.log(error);
        result.innerHTML = "Sorry, your email couldn't be sent";

    }
};

document.getElementById("contact-form").onsubmit = showEmailResult;