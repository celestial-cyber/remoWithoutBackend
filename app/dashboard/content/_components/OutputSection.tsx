'use client';

import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Props {
  aiOutput: string;
}

export default function OutputSection({ aiOutput }: Props) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance && aiOutput) {
      editorInstance.setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  const handleDownloadPDF = async () => {
    const editorInstance = editorRef.current?.getInstance();
    if (!editorInstance) return;

    const contentHTML = editorInstance.getHTML();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentHTML;
    tempDiv.style.padding = '20px';
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    document.body.appendChild(tempDiv);

    const html2pdf = (await import('html2pdf.js')).default;

    html2pdf()
      .from(tempDiv)
      .set({
        margin: 0.5,
        filename: 'AI_Generated_Report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .save()
      .finally(() => {
        document.body.removeChild(tempDiv);
      });
  };

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-bold text-lg">Your result</h2>
        <Button
          onClick={handleDownloadPDF}
          className="flex gap-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <Editor
        ref={editorRef}
        initialValue="Your result will appear here..."
        initialEditType="wysiwyg"
        height="500px"
        useCommandShortcut={true}
      />
    </div>
  );
}
