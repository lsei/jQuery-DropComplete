(function( $ ) {

	$.fn.dropcomplete = function(action) {

		switch(action) {

			case 'getData':

				// check if attached to the right element. 
				if($(this).prop("tagName")!="INPUT" || $(this).data('type')!='dropcomplete') {

					console.log('This is not a dropcomplete input element!');

					return false;

				} else {

					var dataElement = $(this).data('element');
					var dataUrl = $(this).data('url');

					var ajaxUrl = (dataUrl && dataUrl !== '') ? dataUrl : '/api/' + dataElement;

					var that = this;

					$.ajax({
						url: ajaxUrl,
						success: function( data ) {
							
							data = $.parseJSON(data);

							$(that).data('data',data);

							var dropdownItems = "";

							for (var i = 0; i < data.length; i++) {

								dropdownItems += '<li class="dropdownItem' + ((i===0) ? ' selected' : '') + '">' + data[i].name + '</li>';

							}

							$parent = $(that).parents('.form-element');

							if($parent.find('.dropcomplete_dropdown').length>0) {
								
								$parent.find('.dropcomplete_dropdown').html(dropdownItems);

							} else {

								$parent.append(
									$('<ul>')
										.addClass('dropcomplete_dropdown')
										.html(dropdownItems)
								);

							}
						}
					});

					

					

					
				}

			return true;

			// break;

			case 'validate': 

				var dataSet = $(this).data('data');

				var input = $(this).val();

				var valid = false;

				for (var i = 0; i < dataSet.length; i++) {
					if(dataSet[i].name == input) {
						valid = true;
						break;
					}
				}

				if(valid) {

					$(this).removeClass('validating invalid').addClass('valid');

				} else {

					$(this).removeClass('validating valid').addClass('invalid');

				}

			return valid;
			// break
		}

		$(this).on('focus','input[data-type=dropcomplete]',function(){


			var data = $(this).data('data');
			
			if(data) {

				if(!$(this).dropcomplete('validate')) $(this).removeClass('invalid valid').addClass('validating');


			
			} else {

				$(this).dropcomplete('getData');
				$(this).removeClass('invalid valid').addClass('validating');	
			}

			


		});

		$(this).on('keyup','input[data-type=dropcomplete]',function(e){

			var data = $(this).data('data');

			var $parent = $(this).parents('.form-element').first();
			var $selected = $parent.find('.selected');

			var index = $selected.index();
			var count = $parent.find('.dropdownItem').length;


			if(e.which == 13) { // if Enter is pressed


				if($selected.length < 1) return false;

				$(this).val($selected.text());

				if($(this).dropcomplete('validate')) {

					$(this).parents('.form-element').next('.form-element').find('input[type=text]').focus();

				}

				e.preventDefault(); // prevent form from submitting

			}
			else if(e.which == 40) { // down arrow

				$selected.removeClass('selected');

				if(index < count - 1 ) $selected.next().addClass('selected');
				else $parent.find('.dropdownItem').first().addClass('selected');

				e.preventDefault();

				

			} else if(e.which == 38) { // up arrow

				$selected.removeClass('selected');

				if(index !== 0) $selected.prev().addClass('selected');

				else {
					
					$parent.find('.dropdownItem:nth-child('+count+')').addClass('selected');
				}

				e.preventDefault();


			} 

			else if($(this).val().length<1 && e.which != 8) { // if not the delete key so that users deleting their input will still see the whole list. 
				return true;
				
			} else {

				$(this).dropcomplete('validate');

				// filter results based on input
				var searchTerm = $(this).val();


				var filteredData = data.filter(function(element){
					if(element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) == -1) return false;
					else return true;
				});

				var dropdownItems = "";

				for (var i = 0; i < filteredData.length; i++) {

					dropdownItems += '<li class="dropdownItem' + ((i===0) ? ' selected' : '') + '">' + filteredData[i].name + '</li>';

				}

				

				if($parent.find('.dropcomplete_dropdown').length>0) {
					
					$parent.find('.dropcomplete_dropdown').html(dropdownItems);

				} else {

					$parent.append(
						$('<ul>')
							.addClass('dropcomplete_dropdown')
							.html(dropdownItems)
					);

				}

				$parent.addClass('showDropdown');
			}

		});

		$(this).on('blur','input[data-type=dropcomplete]',function(){

			var that = this;

			$parent = $(this).parents('.form-element');

			setTimeout(function() { 

				if(!$parent.hasClass('hold')) {



					$(that).val($(that).val().trim());

					$(that).dropcomplete('validate');

					var inputName = $(that).attr('name');

					// give this enough time for the click event to register.
					// $(that).parents('.form-element').find('ul').remove();
					$(that).parents('.form-element').removeClass('showDropdown');
				}

			}, 200); 

		});

		$('.form-element').on('click','.dropdownItem',function(){

			var term = $(this).text();

			$parent = $(this).parents('.form-element').first();

			$parent.find('input[data-type=dropcomplete]').val(term);

			
			$($parent).next('.form-element').focus();

		});

		$(this).on('click','.trigger-dropdown',function(){


			var $parent = $(this).parents('.form-element').addClass('showDropdown');

			$parent.addClass('hold');

			setTimeout(function() { $parent.removeClass('hold'); }, 600);

			var $inputelem = $parent.find('input[data-type=dropcomplete]');

			$inputelem.focus();


		});

		$(this).submit(function(e){
			
			// prevent form submit if form is invalid. 

			e.preventDefault();

		});

		
	};

}( jQuery ));