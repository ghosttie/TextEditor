/* global Quill, QuillBlotFormatter */

(function() {
	window.QuillFunctions = {
		createQuill: function(
			quillElement,
			toolBar,
			readOnly,
			placeholder,
			theme,
			debugLevel,
			historyModule,
			historyDelay,
			historyMaxStack,
			historyUserOnly,
			syntaxModule,
			tooltips,
			editorReference,
			onTextChangeMethod,
			onDeltaMethod,
			deltaTime
		) {
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

			var quill = new Quill(quillElement, options);

			if (tooltips) {
				$('[data-toggle="tooltip"]').tooltip();
			}

			if (editorReference) {
				if (onDeltaMethod) {
					var Delta = Quill.import('delta');

					var currentChanges = new Delta();
				}

				quill.on('text-change', async function(delta, oldDelta, source) {
					if (onTextChangeMethod) {
						await editorReference.invokeMethodAsync(
							onTextChangeMethod,
							{
								Delta: JSON.stringify(delta),
								OldDelta: JSON.stringify(oldDelta),
								Source: source
							}
						);
					}

					if (onDeltaMethod) {
						if (source === 'user') {
							// Store accumulated changes
							currentChanges = currentChanges.compose(delta);
						}
					}
				});

				if (onDeltaMethod) {
					var saveChanges = async function() {
						if (currentChanges.length() > 0) {
							// stringify and clear currentChanges before await to avoid race
							var delta = JSON.stringify(currentChanges);

							currentChanges = new Delta();

							await editorReference.invokeMethodAsync(onDeltaMethod, delta);
						}
					};

					// Save periodically
					setInterval(saveChanges, deltaTime);

					// Check for unsaved data
					window.addEventListener('beforeunload', function(e) {
						if (currentChanges.length() > 0) {
							e.preventDefault();
							e.returnValue = 'Unsaved changes';

							saveChanges(); // not awaiting because beforeunload won't wait

							return 'Unsaved changes';
						} else {
							delete e['returnValue'];
						}
					});
				}
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
			var content = JSON.parse(quillContent);
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
			var editorIndex = 0;

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