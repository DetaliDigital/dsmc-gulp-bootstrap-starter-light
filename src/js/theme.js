'use strict';

//
// Forms input phone masked
//

let mask = Maska.create('.masked');

function spinners() {
    $("input[type='number']").inputSpinner({
        groupClass: "product-card-count-group",
        buttonsClass: 'count-minus',
        buttonsWidth: '1rem',
        decrementButton: '',
        incrementButton: '',
        template: // the template of the input
            '<div class="input-group ${groupClass}">' +
            '<button style="min-width: ${buttonsWidth}" class="btn btn-decrement ${buttonsClass} btn-minus" type="button">${decrementButton}</button>' +
            '<input type="text" inputmode="decimal" style="text-align: ${textAlign}" class="form-control form-control-text-input"/>' +
            '<button style="min-width: ${buttonsWidth}" class="btn btn-increment ${buttonsClass} btn-plus" type="button">${incrementButton}</button>' +
            '</div>'
    });
}

spinners();
//
// Forms custom JS mvtForms2
//

mvtForms2.callbacks.success = function (response) {
    $("body").overhang({
        type: "success",
        message: response.data.answer
    });
    $('#' + response.form + '_form').reset();
};

mvtForms2.callbacks.error = function (response) {
    console.log(response);
    $("body").overhang({
        type: "error",
        message: response.data.message
    });
};

$(document).on('mse2_load', function(e, data) {
    spinners();
});