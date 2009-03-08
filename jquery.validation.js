(function($) {
    //
    // validatesPresence
    //
    // This validator ensures value presence
    // The default options are:
    //
    //      invalidClass:   'invalid-presence',
    //      blankValue:     '',
    //      when:           callBack(context)
    //      validatesOn:    ['change', 'blur']
    //
    //
    //      invalidClass:   the css class to add to the element(s) when validation fails
    //      blankValue:     allows you to specify the value to compare against for testing "blankness"
    //      when:           this callback function should return true/false depending on whether this validation should be run
    //                      it's passed the current $ object (context)
    //      validatesOn:    an array of events to trigger validation on
    //
    $.fn.validatesPresence = function(options) {
        return this.each(function() {
            var el = $(this);
            var settings = $.extend({
                                invalidClass: 'invalid-presence',
                                blankValue: '',
                                when: function() {return true;},
                                validatesOn: ['change', 'blur']
                            }, options);

            el.bind(settings.validatesOn.join(' '), function(e) {
                if (settings.when(el)) {
                    if ((el.val() === settings.blankValue) || (el.get(0).type == 'checkbox' && !el.attr('checked'))) {
                        el.trigger('invalid')
                            .trigger('invalid-presence')
                            .closest('fieldset')
                            .addClass(settings.invalidClass);
                    } else {
                        el.trigger('valid')
                            .trigger('valid-presence')
                            .closest('fieldset')
                            .removeClass(settings.invalidClass);
                    }
                }
            });
        });
    };


    // This is our default set of validation formats to be used with the validatesFormat function
    $.validationFormats = {
        email: {
            validationRegex: /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i
        },
        subDomain: {
            validationRegex: /[^a-z0-9-]/i,
            invertRule: true
        }
    };

    //
    // validatesFormat
    //
    // This validator ensures value format
    // The default options are:
    //
    //      invalidClass:       'invalid-format',
    //      validationRegex:    ".*",
    //      validatesOn:        ['change'],
    //      invertRule:         false
    //      when:               callBack(context)
    //
    //
    //      invalidClass:       the css class to add to the element(s) when validation fails
    //      validationRegex:    this is the regex string used for testing validation
    //      validatesOn:        an array of events to trigger validation on
    //      invertRule:         a boolean that determines if a match is required or not. False means a match must be found, True means no match can be found
    //      when:               this callback function should return true/false depending on whether this validation should be run
    //                          it's passed the current $ object (context)
    //
    $.fn.validatesFormat = function(options) {
        return this.each(function() {
            var el = $(this);
            var settings = $.extend({
                                invalidClass: 'invalid-format',
                                validationRegex: ".*",
                                validatesOn: ['change', 'blur'],
                                invertRule: false,
                                when: function() {return true;}
                            }, options);

            el.bind(settings.validatesOn.join(' '), function(e) {
                if (settings.when(el)) {
                    if (el.val() !== '') {
                        var match = el.val().match(settings.validationRegex);
                        if (settings.invertRule) {
                            if (match !== null) {
                                el.trigger('invalid')
                                    .trigger('invalid-format')
                                    .closest('fieldset')
                                    .addClass(settings.invalidClass);
                            } else {
                                el.trigger('valid')
                                    .trigger('valid-format')
                                    .closest('fieldset')
                                    .removeClass(settings.invalidClass);
                            }
                        } else {
                            if (match === null) {
                                el.trigger('invalid')
                                    .trigger('invalid-format')
                                    .closest('fieldset')
                                    .addClass(settings.invalidClass);
                            } else {
                                el.trigger('valid')
                                    .trigger('valid-format')
                                    .closest('fieldset')
                                    .removeClass(settings.invalidClass);
                            }
                        }
                    } else {
                        el.closest('fieldset')
                        .removeClass(settings.invalidClass);
                    }
                }
            });
        });
    };


    //
    // validatesLength
    //
    // This validator ensures value length
    // The default options are:
    //
    //      invalidClass:   'invalid-length',
    //      minimum:        null,
    //      maximum:        null,
    //      validatesOn:    ['change', 'blur'],
    //      when:           callBack(context)
    //
    //
    //      invalidClass:       the css class to add to the element(s) when validation fails
    //      minimum:            the tested value must be greater than this value to be valid
    //      maximum:            the tested value must be less than this value to be valid
    //      validatesOn:        an array of events to trigger validation on
    //      when:               this callback function should return true/false depending on whether this validation should be run
    //                          it's passed the current $ object (context)
    //
    $.fn.validatesLength = function(options) {
        return this.each(function() {
            var el = $(this);
            var settings = $.extend({
                                invalidClass: 'invalid-length',
                                minimum: null,
                                maximum: null,
                                validatesOn: ['change', 'blur'],
                                when: function() {return true;}
                            }, options);

            el.bind(settings.validatesOn.join(' '), function(e) {
                if (settings.when(el)) {
                    var valid = true;
                    if (settings.minimum !== null && el.val().length < settings.minimum) {
                        valid = false;
                    }
                    if (settings.maximum !== null && el.val().length > settings.maximum) {
                        valid = false;
                    }
                    if (!valid) {
                        el.trigger('invalid')
                            .trigger('invalid-length')
                            .closest('fieldset')
                            .addClass(settings.invalidClass);
                    } else {
                        el.trigger('valid')
                            .trigger('valid-length')
                            .closest('fieldset')
                            .removeClass(settings.invalidClass);
                    }
                }
            });
        });
    };

    //
    // validatesNumericality
    //
    // This validator ensures value numericality
    // The default options are:
    //
    //      invalidClass:   'invalid-length',
    //      onlyInteger:    false,
    //      validatesOn:    ['change', 'blur'],
    //      when:           callBack(context)
    //
    //
    //      invalidClass:       the css class to add to the element(s) when validation fails
    //      onlyInteger:        if this is true, validation success will be limited to integer values only
    //      allowBlank:         if this is true, validation won't be attempted if the value passes it's "blankness" test
    //      blankValue:         allows you to specify the value to compare against for testing "blankness"
    //      validatesOn:        an array of events to trigger validation on
    //      when:               this callback function should return true/false depending on whether this validation should be run
    //                          it's passed the current $ object (context)
    //
    $.fn.validatesNumericality = function(options) {
        return this.each(function() {
            var el = $(this);
            // TODO: I18n
            var settings = $.extend({
                                invalidClass: 'invalid-numericality',
                                onlyInteger: false,
                                validatesOn: ['change', 'blur'],
                                when: function() {return true;}
                            }, options);

            el.bind(settings.validatesOn.join(' '), function() {
                if (settings.when(el)) {
                    if (isNaN(el.val().replace(/,/g, ''))) {
                        el.trigger('invalid')
                            .trigger('invalid-numericality')
                            .closest('fieldset')
                            .addClass(settings.invalidClass);
                    } else {
                        el.trigger('valid')
                            .trigger('valid-numericality')
                            .closest('fieldset')
                            .removeClass(settings.invalidClass);
                    }
                }
            });
        });
    };


    //
    // validatesUniqueness
    //
    // This plugin will validate uniqueness of the elements value against a local or remote array
    // or a custom callback method to determine uniqueness against said local or remote array/object
    //
    // The custom callback method will be useful in a situation where the array/object isn't a simple
    // array of strings to compare against. This callback method *must* return true or false
    // The default options are:
    //
    //      invalidClass:   'invalid-uniqueness',
    //      source:         [],
    //      validatesOn:    ['change', 'blur'],
    //      when:           callBack(context)
    //
    //
    //      invalidClass:       the css class to add to the element(s) when validation fails
    //      source:             if this is an array a match is attempted inside
    //                          if this is a string, it's assumed to be a URL for which to send an ajax request with the
    //                          parameter 'q' who's value is the value of the element in question.
    //                          The response *must* be a JSON array in this case
    //      validatesOn:        an array of events to trigger validation on
    //      when:               this callback function should return true/false depending on whether this validation should be run
    //                          it's passed the current $ object (context)
    //
    $.fn.validatesUniqueness = function(options) {
        return this.each(function() {
            var el = $(this);
            var settings = $.extend({
                    invalidClass: 'invalid-uniqueness',
                    source: [],
                    validatesOn: ['change', 'blur'],
                    when: function() {return true;}
                }, options);
            var req = null;

            el.bind(settings.validatesOn.join(' '), function(e) {
                if (settings.when(el)) {
                    e.preventDefault();
                    var formVal = el.val();
                    var foundMatch = false;
                    if (formVal !== '') {
                        if ($.isArray(settings.source)) {
                            $.each(settings.source, function(i, item) {
                                if (item === formVal) {
                                    el.trigger('invalid')
                                        .trigger('invalid-uniqueness')
                                        .closest('fieldset')
                                        .addClass(settings.invalidClass);
                                } else {
                                    el.trigger('valid')
                                        .trigger('valid-uniqueness')
                                        .closest('fieldset')
                                        .removeClass(settings.invalidClass);
                                }
                            });
                        } else if (settings.source.toLowerCase) { // assume it's a string, and is a URL to fetch from
                            // Cancel the pending request so we don't have to wait for it to come back
                            if (req !== null && req.readyState < 4) {
                                req.abort();
                            }
                            req = $.getJSON(settings.source, 'q='+formVal, function(data) {
                                if (el.val() === formVal) {
                                    if (data.length > 0) {
                                        el.trigger('invalid')
                                            .trigger('invalid-uniqueness')
                                            .closest('fieldset')
                                            .addClass(settings.invalidClass);
                                    } else {
                                        el.trigger('valid')
                                            .trigger('valid-uniqueness')
                                            .closest('fieldset')
                                            .removeClass(settings.invalidClass);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        });
    };


    //
    // validates
    //
    // This is for specifying a custom validation function which *must* return true or false
    // The default options are:
    //
    //      invalidClass:   'invalid',
    //      validatesWith:   callback(element),
    //      validatesOn:    ['change']
    //
    //
    //      invalidClass:       the css class to add to the element(s) when validation fails
    //      validatesWith:      a custom callback function which gets passed the element validation is being attempted on
    //                          whcih *must* return true or false depending on validation success or failure
    //      validatesOn:        an array of events to trigger validation on
    //
    $.fn.validates = function(options) {
        return this.each(function() {
            var el = $(this);
            var settings = $.extend({
                                invalidClass: 'invalid',
                                validatesWith: function(el) {
                                    console.log('must pass a validator function');
                                    return false;
                                },
                                validatesOn: ['change']
                            }, options);

            el.bind(settings.validatesOn.join(' '), function() {
                if (!settings.validatesWith(el)) {
                    el.trigger('invalid')
                        .trigger('invalid-uniqueness')
                        .closest('fieldset')
                        .addClass(settings.invalidClass);
                } else {
                    el.trigger('valid')
                        .trigger('valid-uniqueness')
                        .closest('fieldset')
                        .removeClass(settings.invalidClass);
                }
            });
        });
    };
})(jQuery);