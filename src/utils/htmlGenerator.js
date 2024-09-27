export const generatePdfHtml = (shipName, surveyName, address, date, surveyor, description) => {
  const content = `
    <!DOCTYPE html>
<html>
  <head>
    <style>
      @import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700");

        @page {
            margin: 50px;
        }

      body {
        font-family: Roboto, sans-serif;
      }

      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td,
      th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }

      .headerTitle {
        text-align: center;
        margin-top: 6px;
        margin-bottom: 0px;
      }
      .address {
        text-align: center;
        margin-top: 6px;
        margin-bottom: 0px;
      }
      .date {
        text-align: center;
        margin-top: 6px;
        margin-bottom: 0px;
      }
      .descriptionContainer {
        margin-top: 64px;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      .surveyorInfo {
	display: flex;
   justify-content: end;
   margin-top: 100px
}

.signatureContainer {

width: 200px;
height: 200px;
}

.centerText {
	text-align: center
}

.surveyorTitle {
	text-align: center;
    margin-bottom: 120px
}
    </style>
  </head>
  <body>
    <div class="container">
      <h3 class="headerTitle">${shipName} ${surveyName}</h3>
      <h5 class="address">${address}</h5>
      <h5 class="date">${date}</h5>

      <div class="descriptionContainer">
      ${description}
      </div>
      <div class="surveyorInfo">
        <div class="signatureContainer">
            <p class="surveyorTitle">Surveyor</p>
            <p class="centerText">${surveyor}</p>
        </div>
        </div>
    </div>
  </body>
</html>

    `;

  return content;
};
