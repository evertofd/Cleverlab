var data = [];

function parseData(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.readAsBinaryString(file);
  reader.onload = function () {
    var dataUri = "data:" + file.type + ";base64," + btoa(reader.result);
    data.push({ name: file.name, data: dataUri });
  };
  reader.onerror = function () {
    alert("problemas al cargar el archivo");
  };
}
function uploadFileToServer(
  nameValue,
  lastNameValue,
  addresValue,
  emailValue,
  capacityValue,
  descriptionValue,
  phoneValue
) {
  let name = nameValue;
  let lastName = lastNameValue;
  let address = addresValue;
  let email = emailValue;
  let capacity = capacityValue;
  let description = descriptionValue;
  let phone = phoneValue;

  Email.send({
    SecureToken: "07ae3491-73bd-49fd-8a52-18bab0ed3254",
    To: `cleverlab.chile@gmail.com, ${email}`,
    From: "cleverlab9@gmail.com",
    Subject: `Requerimiento de contacto de: ${name}`,
    Body: `
    <strong>Nombre:</strong> ${name} <br/>
    <strong>Apellido:</strong> ${lastName} <br/>
    <strong>Dirección</strong> ${address} <br/>
    <strong>Email:</strong> ${email} <br/>
    <strong>Telefono:</strong> ${phone} <br/>
    <strong>Discapacidad:</strong> ${capacity} <br/>
    <strong>Mensaje:</strong> ${description} <br/>
    `,
    Attachments: data,
  })
    .then((message) => {
      alert(
        "¡Solicitud de contacto enviada!. Hemos enviado una copia a tu correo electronico!"
      );
      location.reload();
    })
    .catch((err) => {
      alert("Hubo un error Vuelve a intentarlo");
    });
}

$("form").on("submit", (event) => {
  event.preventDefault();
  var nameValue = document.getElementById("inputName").value;
  var lastNameValue = document.getElementById("inputLastName").value;
  var addresValue = document.getElementById("inputAddress").value;
  var emailValue = document.getElementById("inputEmail").value;
  var phoneValue = document.getElementById("inputPhone").value;
  var capacityValue = document.getElementById("inputCapacity").value;
  var descriptionValue = document.getElementById("inputDescription").value;

  let expresion = /\d/gim;
  console.log(
    nameValue,
    lastNameValue,
    addresValue,
    emailValue,
    capacityValue,
    descriptionValue,
    phoneValue
  );

  if (
    nameValue &&
    lastNameValue &&
    emailValue &&
    phoneValue &&
    capacityValue &&
    expresion.test(phoneValue)
  ) {
    uploadFileToServer(
      nameValue,
      lastNameValue,
      addresValue,
      emailValue,
      capacityValue,
      descriptionValue,
      phoneValue
    );
  } else {
    alert(
      "Debes completar los campos requeridos marcados con el * ó verificar el numero telefonico Ejemplo: 56958652214"
    );
  }
});
