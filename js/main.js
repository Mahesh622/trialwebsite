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
  if (event.code == "Enter"){
    var parentNode = document.getElementById(elementId).parentNode.nextElementSibling;
    if (parentNode != null) {
      parentNode.children[1].focus();
    }
    else {
      document.getElementById(elementId).parentNode.parentNode.nextElementSibling.children[0].children[1].focus();
    }
  }
}

// function calculateGrossAmount() {
//   var productQuantity = document.getElementById('product-quantity-modal').value;
//   var productRate = document.getElementById('product-rate-modal').value;
//   var prouctDiscount = document.getElementById('product-discount-modal').value == null ? 0 : document.getElementById('product-discount-modal').value;
//   var grossAmount = document.getElementById('product-gstpercent-modal')
//   if (productQuantity != '' && productRate != '') {
//     grossAmount = (productQuantity * productRate) - (productQuantity * productRate) * (prouctDiscount/100);
//     document.getElementById('product-gross-amount-modal').disabled = false;
//     document.getElementById('product-gross-amount-modal').value = grossAmount;
//     document.getElementById('product-gross-amount-modal').disabled = true;
//   }
// }

function calculateEachAmount() {
  var productQuantity = document.getElementById('product-quantity-modal').value;
  var productRate = document.getElementById('product-rate-modal').value;
  var prouctDiscount = document.getElementById('product-discount-modal').value == null ? 0 : document.getElementById('product-discount-modal').value;
  if (productQuantity != '' && productRate != '') {
    var grossAmount = (productQuantity * productRate) - (productQuantity * productRate) * (prouctDiscount/100);
    document.getElementById('product-gross-amount-modal').disabled = false;
    document.getElementById('product-gross-amount-modal').value = grossAmount;
    document.getElementById('product-gross-amount-modal').disabled = true;
  }
  // var grossAmount = document.getElementById('product-gross-amount-modal').value
  var productGstPercernt = document.getElementById('product-gstpercent-modal').value;
  if (grossAmount != '') {
    var gstAmount = grossAmount * (productGstPercernt.slice(0, -1) / 100);
    var totalAmount = parseInt(grossAmount) + parseInt(gstAmount);
    document.getElementById('product-gstamount-modal').disabled = false;
    document.getElementById('product-gstamount-modal').value = gstAmount;
    document.getElementById('product-gstamount-modal').disabled = true;
    document.getElementById('product-amount-modal').disabled = false;
    document.getElementById('product-amount-modal').value = totalAmount;
    document.getElementById('product-amount-modal').disabled = true;
  }
}

function addEntryToTable() {
  var productSrNo = (document.getElementById('product-table-body').getElementsByTagName("tr").length)/2;
  var productName = document.getElementById('product-name-modal').value;
  var productHsn = document.getElementById('product-hsn-modal').value;
  var productQuantity = document.getElementById('product-quantity-modal').value;
  var productUnit = document.getElementById('product-unit-modal').value;
  var productRate = document.getElementById('product-rate-modal').value;
  var productDiscount = document.getElementById('product-discount-modal').value;
  var productGrossAmount = document.getElementById('product-gross-amount-modal').value;
  var productGstPercernt = document.getElementById('product-gstpercent-modal').value;
  var productGstAmount = document.getElementById('product-gstamount-modal').value;
  var productAmount = document.getElementById('product-amount-modal').value;
  var request = $.ajax({
    method: "POST",
  })
  request.done(function () {
    html = document.getElementById('product-table-body').innerHTML;
    html += ` <tr>
                <td>`+ productSrNo + `</td>
                <td>`+ productName + `</td>
                <td>`+ productQuantity + `</td>
                <td>`+ productRate + `</td>
                <td>`+ productGstPercernt + `</td>
                <td>`+ productAmount + `</td>
              </tr>
              
              <tr>
              <td colspan="6">
               <a class="btn btn-primary" data-toggle="collapse; changeButtonOrientation" href="#collapseRow`+ productSrNo +`" role="button" aria-expanded="false" aria-controls="collapseExample" id="extraInfoButton" onpress="changeButtonOrientation(id)" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                  </svg></a>
                  <div class="collapse" id="collapseRow`+ productSrNo +`">
                    <div class="card card-body">
                      <table class="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 10%">HSN</th>
                            <th scope="col" style="width: 5%;">Unit</th>
                            <th scope="col" style="width: 5%;">Disc</th>
                            <th scope="col" style="width: 10%;">Gross Amount</th>
                            <th scope="col" style="width: 10%;">GST amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>`+ productHsn + `</td>
                            <td>`+ productUnit + `</td>
                            <td>`+ productDiscount + `</td>
                            <td>`+ productGrossAmount + `</td>
                            <td>`+ productGstAmount + `</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </td>
              </tr>
              
              `;
    $('#product-table-body').html(html);
  })
}

function changeButtonOrientation(elementId) {
  console.log(document.getElementById(elementId).innerHTML);
}

// '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" /> </svg>'