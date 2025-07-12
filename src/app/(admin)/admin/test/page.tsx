'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function MyEditor() {
  const editorRef = useRef<any>(null);

  const logContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div className="p-4">
      <Editor
        apiKey="pof9b2gtr6oym0zr3guzi3rct66l72tzsx5tjgda4znehvvb" 
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | image | help',

          automatic_uploads: true,
          file_picker_types: 'image',

          file_picker_callback: (cb: any, value: any, meta: any) => {
            if (meta.filetype === 'image') {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function () {
                const file = input.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = function () {
                  const base64 = reader.result?.toString() || '';
                  cb(base64, { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          },

          // images_upload_handler: (blobInfo: any, success: any, failure: any) => {
          //   const formData = new FormData();
          //   formData.append('file', blobInfo.blob(), blobInfo.filename());

          //   fetch('https://your-server.com/upload', {
          //     method: 'POST',
          //     body: formData,
          //   })
          //     .then((res) => res.json())
          //     .then((result) => {
          //       // Kết quả trả về phải có { location: 'https://...' }
          //       if (result.location) {
          //         success(result.location);
          //       } else {
          //         failure('Invalid upload response');
          //       }
          //     })
          //     .catch((err) => {
          //       console.error(err);
          //       failure('Upload failed: ' + err.message);
          //     });
          // },
        }}
      />

      <button
        onClick={logContent}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Lấy nội dung
      </button>
    </div>
  );
}

