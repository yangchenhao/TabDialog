function TabDialog() {
	this.tabCounter = 0;
	this.tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
	this.init = function() {
		var dialog = $('<div></div>', { id: "dialog" });
		dialog.appendTo($(document.body));
		var tabs = $('<div></div>', { id: "tabs" });
		tabs.appendTo($("#dialog"));
		$('<ul></ul>').appendTo(tabs);
		$('<li class="ui-tabs-close-button"><button id="closeBtn">X</button></li>').appendTo('#tabs ul');
		$('<li class="ui-tabs-close-button"><button id="dialog_trigger">pop up</button></li>').appendTo('#tabs ul');
		$('#dialog').dialog({
		    draggable: true,
		    resizable: true,
		    modal: true,
		    height: 500,
		    width: 500, 
		    open: function() {
		        $('#tabs').tabs({
		            create: function(e, ui) {
		                $('#closeBtn').click(function() {
		                    $('#dialog').dialog('close');
		                });
		            }
		        });
		        $(this).parent().children('.ui-dialog-titlebar').remove();
		    }
		});

	};
	this.add = function(title, url) {
        var li = $( this.tabTemplate.replace( /#\{href\}/g, url ).replace( /#\{label\}/g, title ) );
      	$('#tabs').find( ".ui-tabs-nav" ).append( li );
     	$('#tabs').tabs( "refresh" );
      	this.tabCounter++;
	};

	
	this.close = function(){
	  	$('#tabs').on( "click", "span.ui-icon-close", function() {
	      	var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
	      	$( "#" + panelId ).remove();
	      	$('#tabs').tabs( "refresh" );
	    });
	};

	this.popup = function() {

		var dialogPopup = $('<div></div>', { id: "dialogPopup" });
		dialogPopup.appendTo($(document.body));
		$("#dialogPopup").dialog({
		    autoOpen: false,
		    position: 'center' ,
		    title: 'dialog',
		    draggable: true,
		    width : 500,
		    height : 500, 
		    resizable : true,
		    modal : true,
		});

		$("#dialog_trigger").click( function() {
			var li = $('#tabs li.ui-tabs-tab');
			var panelId = "";
			var url = "";
			for(var i=0; i<li.length; i++){
				if($(li[i]).attr("aria-selected") == "true"){
					panelId = $(li[i]).attr("aria-controls");
					url = $(li[i]).find("a").attr("href");
					$(li[i]).remove();
				}
			}
			if(panelId == "" && url == ""){
				alert("No Page is Selected!");
			}
			else {
				$("#dialogPopup").load(url, function() {
			        $("#dialogPopup").dialog("open");
			    });
				$( "#" + panelId ).remove();
		      	$('#tabs').tabs( "refresh" );
			}
		})
	};

}