namespace Blazored.TextEditor {
	public class TextChangeEventArgs {
		public string Delta { get; set; }
		public string OldDelta { get; set; }
		public string Source { get; set; }
	}
}
