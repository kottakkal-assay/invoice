
$(document).ready(function () {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    var dt = new Date();
    var time = dt.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    
    var datetime = monthNames[dt.getMonth()]+" " +dt.getDate()+ ","+dt.getFullYear()+"   " +time;
    // console.log(n)
    $('#date-time').text("Date and Time : " + datetime)
    var rowIdx = 2;
    // jQuery button click event to add a row
    $('#addBtn').on('click', function () {

        // Adding a row inside the tbody.
        $('#tbody').append(`
            <tr  id="R${++rowIdx}" class="item-row">
            <th class="row-index" scope="row">${rowIdx}</th>
            <td >
                <select class="items" name="item" id="items">
                    <option value="fire_testing">Fire Testing</option>
                    <option value="machine_testing">Machine Testing</option>
                    <option value="hallmarking">Hallmarking</option>
                </select>
            </td>
            <td contenteditable="true">0</td>
            <td contenteditable="true">0.00</td>
        <td ><i class="fa-solid fa-circle-xmark text-danger btn-remove"></i></td>

        </tr>`);
        // if(rowIdx==1) $("#items").val("fire_testing");
        // else if(rowIdx==2) $("#items").val("machine_testing");
        // else if(rowIdx==3) $("#items").val("hallmarking");
    });
    // jQuery button click event to remove a row.
    $('#tbody').on('click', '.btn-remove', function () {

        // Getting all the rows next to the row
        // containing the clicked button
        var child = $(this).closest('tr').nextAll();
        // console.log($(this).closest('tr'))
        // Iterating across all the rows 
        // obtained to change the index
        child.each(function () {

            // Getting <tr> id.
            var id = $(this).attr('id');
            // Getting the <p> inside the .row-index class.
            // Gets the row number from <tr> id.
            var dig = parseInt(id.substring(1));

                        // Modifying row index.
            $(this).children('.row-index').text(dig-1);

            // Modifying row id.
            $(this).attr('id', `R${dig - 1}`);
        });

        $(this).closest('tr').remove();
    

        // Decreasing total number of rows by 1.
        rowIdx--;
    });
    $('#tbody').on('mouseover', '.item-row', function () {
        var currentRow = $(this).closest(".item-row");
        currentRow.find("td:eq(3)").children('i').addClass('hover-btn');
    });
    $('#tbody').on('mouseout', '.item-row', function () {
        var currentRow = $(this).closest(".item-row");
        currentRow.find("td:eq(3)").children('i').removeClass('hover-btn');
    });

    // updating the quantity and weight
    $('#tbody').on('keyup', function () {
        var child = $(this).find('.item-row');
        var total_qty=0;
        var total_wht=0;
        child.each(function () {
            qty=parseInt($(this).find("td:eq(1)").text());
            weight=parseFloat($(this).find("td:eq(2)").text());
            
            // cheching for nulllvalues

            if ($.isNumeric(qty)){
                total_qty+=qty;
            }
            else{
                total_qty+=0;
            }
            if (!isNaN(weight)){
                total_wht+=weight;
            }
            else{
                total_wht+=0.0;
            }


        });
        // updating fields of total
        $('#total-qty').text(total_qty);
        $('#total-weight').text(total_wht.toFixed(2));
    });

});

window.onload = function () {
    document.getElementById("download")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("invoice");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 0,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        })
}

