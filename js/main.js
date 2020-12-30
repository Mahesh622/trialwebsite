function ifEmpty(elementId) {
        if (document.getElementById(elementId.toString()).value == ""){
          document.getElementById( elementId.toString()).style.borderColor = 'red';
          document.getElementById( elementId.toString()).style.boxShadow = 'none';
          document.getElementById( elementId.toString()).style.color = 'red';
          if (document.getElementById(elementId.toString()).parentNode.getElementsByTagName('small')[0]  == null) {
            var request = $.ajax({
              method: "POST",
              // contentType: false, 
              // processData: false, 
            })
            request.done(function () {
              var html = document.getElementById(elementId.toString()).parentElement.innerHTML;
              html += `<small style='color:red;' id='` + elementId + `-smallerrormessage'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                            </svg>
                              field should not be empty
                          </small>`;
              $('#' + document.getElementById(elementId.toString()).parentElement.id).html(html);
            })
          }
        }
        else if (document.getElementById(elementId.toString()).value != ""){
          document.getElementById(elementId.toString()).style.borderColor = 'lightgrey';
          document.getElementById(elementId.toString()).style.color = 'grey';
          document.getElementById(elementId.toString()).style.boxShadow = 'none';
          document.getElementById(elementId.toString()).style.borderWidth = '0.5';
          if (document.getElementById(elementId.toString()).parentNode.getElementsByTagName('small')[0] != null) {
            document.getElementById(elementId.toString()).parentNode.getElementsByTagName('small')[0].remove();
          }
        }
}

function ifEmptyOnEnter(elementId) {
  // $.get(elementId).
  console.log(event.code)
//   var idList = ["product-name-model", "product-hsn-model",
//     "product-quantity-model", "product-unit-model", "product-rate-model",
//     "product-discount-model", "product-gstpercent-model"];
//   function findSameId(id) {
//     return id = elementId.toString();
//   }
//   console.log(idList.find(findSameId));
  // document.getElementById(elementId.toString()).parentElement.nextElementSibling.getElementsByTagName('input')[0].focus();

}

