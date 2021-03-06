﻿using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Blazored.TextEditor {
	public static class Interop {
		internal static ValueTask<object> CreateQuill(
			IJSRuntime jsRuntime,
			ElementReference quillElement,
			ElementReference toolbar,
			bool readOnly,
			string placeholder,
			string theme,
			string debugLevel,
			bool historyModule,
			int historyDelay,
			int historyMaxStack,
			bool historyUserOnly,
			bool syntaxModule,
			bool tooltips,
			DotNetObjectReference<BlazoredTextEditor> EditorReference,
			string OnTextChangeMethod,
			string OnDeltaMethod,
			int DeltaTime
		) {
			return jsRuntime.InvokeAsync<object>(
				"QuillFunctions.createQuill",
				quillElement,
				toolbar,
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
				EditorReference,
				OnTextChangeMethod,
				OnDeltaMethod,
				DeltaTime
			);
		}

		internal static ValueTask<string> GetText(IJSRuntime jsRuntime, ElementReference quillElement) {
			return jsRuntime.InvokeAsync<string>("QuillFunctions.getQuillText", quillElement);
		}

		internal static ValueTask<string> GetHTML(IJSRuntime jsRuntime, ElementReference quillElement) {
			return jsRuntime.InvokeAsync<string>("QuillFunctions.getQuillHTML", quillElement);
		}

		internal static ValueTask<string> GetContent(IJSRuntime jsRuntime, ElementReference quillElement) {
			return jsRuntime.InvokeAsync<string>("QuillFunctions.getQuillContent", quillElement);
		}

		internal static ValueTask<object> LoadQuillContent(IJSRuntime jsRuntime, ElementReference quillElement, string Content) {
			return jsRuntime.InvokeAsync<object>("QuillFunctions.loadQuillContent", quillElement, Content);
		}

		internal static ValueTask<object> LoadQuillHTMLContent(IJSRuntime jsRuntime, ElementReference quillElement, string quillHTMLContent) {
			return jsRuntime.InvokeAsync<object>("QuillFunctions.loadQuillHTMLContent", quillElement, quillHTMLContent);
		}

		internal static ValueTask<object> EnableQuillEditor(IJSRuntime jsRuntime, ElementReference quillElement, bool mode) {
			return jsRuntime.InvokeAsync<object>("QuillFunctions.enableQuillEditor", quillElement, mode);
		}

		internal static ValueTask<object> InsertQuillImage(IJSRuntime jsRuntime, ElementReference quillElement, string imageURL) {
			return jsRuntime.InvokeAsync<object>("QuillFunctions.insertQuillImage", quillElement, imageURL);
		}
	}
}