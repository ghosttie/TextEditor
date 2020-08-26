(function() {
	window.QuillFunctions = {
		createQuill: function(quillElement, toolBar, readOnly, placeholder, theme, debugLevel, historyModule, historyDelay, historyMaxStack, historyUserOnly, syntaxModule, tooltips) {
			Quill.register('modules/blotFormatter', QuillBlotFormatter.default);

			var modules = {
				toolbar: toolBar,
				blotFormatter: {},
				syntax: syntaxModule
			};

			if (historyModule) {
				modules.history = {
					delay: historyDelay,
					maxStack: historyMaxStack,
					userOnly: historyUserOnly
				};
			}

			var options = {
				debug: debugLevel,
				modules: modules,
				placeholder: placeholder,
				readOnly: readOnly,
				theme: theme
			};

			new Quill(quillElement, options);

			if (tooltips) {
				$('[data-toggle="tooltip"]').tooltip();
			}
		},
		getQuillContent: function(quillElement) {
			return JSON.stringify(quillElement.__quill.getContents());
		},
		getQuillText: function(quillElement) {
			return quillElement.__quill.getText();
		},
		getQuillHTML: function(quillElement) {
			return quillElement.__quill.root.innerHTML;
		},
		loadQuillContent: function(quillElement, quillContent) {
			content = JSON.parse(quillContent);
			return quillElement.__quill.setContents(content, 'api');
		},
		loadQuillHTMLContent: function(quillElement, quillHTMLContent) {
			return quillElement.__quill.root.innerHTML = quillHTMLContent;
		},
		enableQuillEditor: function(quillElement, mode) {
			quillElement.__quill.enable(mode);
		},
		insertQuillImage: function(quillElement, imageURL) {
			var Delta = Quill.import('delta');
			editorIndex = 0;

			if (quillElement.__quill.getSelection() !== null) {
				editorIndex = quillElement.__quill.getSelection().index;
			}

			return quillElement.__quill.updateContents(
				new Delta()
					.retain(editorIndex)
					.insert({ image: imageURL },
						{ alt: imageURL }));
		}
	};
})();