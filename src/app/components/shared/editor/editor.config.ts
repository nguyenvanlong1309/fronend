import { SummernoteOptions } from "ngx-summernote/lib/summernote-options";

export class EditorConfig {

    public static editorConfig: SummernoteOptions = {
      placeholder: '',
      tabsize: 2,
      height: 200,
      toolbar: [
          ['misc', ['codeview', 'undo', 'redo']],
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
          ['fontsize', ['fontname', 'fontsize', 'color']],
          ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
          ['insert', ['table', 'picture', 'link', 'video', 'hr']]
      ],
      fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
    }
}