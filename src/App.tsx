import { useState, useEffect, useRef, MutableRefObject, ReactHTMLElement } from "react";
import { marked }  from "marked";
import { BsArrowsFullscreen, BsArrowsAngleExpand } from "react-icons/bs";
import { ActiveProps } from "./types/ActiveProps"; 


function App() {
  const [content, setContent] = useState<string>(
  `
  # H1
  ## H2
  ### H3
  [link title](www.example.com)

  **this is bold**

  *this is italic*

  ### Inline code 
  Print hello: \`console.log("Hello")\` 

  ### Multiline code
  \`\`\` 
  function sum(a:number, b:number) {
    return a + b; 
  }
  \`\`\`

  ### Lists
  - first item 
  - second item 
    - sub item 
    - sum item 
      - sub sub item 
    - sum item
  - other item

  ### Quote
  > this is a quote


  ### Image
  <img src='./assets/images/a.jpg' alg='code' title='code'>

  `); 

  marked.setOptions({
    breaks: true
  }); 

  const divEditorWrap = useRef<HTMLDivElement | null>(null); 
  const divPreviewWrap = useRef<HTMLDivElement | null>(null); 

  const [activeElements, setActiveElements] = useState<ActiveProps | null>({
    activeEditor: false, 
    activePreview: false
  }); 
  
  const handleEditor = () => {
    divEditorWrap.current.classList.toggle("maximized");
    if(divEditorWrap.current.classList.contains("maximized")) {
      divPreviewWrap.current.style.display = 'none'; 
    } else {
      divPreviewWrap.current.style.display = 'block'; 
    }
    setActiveElements((prevState) => {
      return {
        ...prevState, 
        activeEditor: !prevState?.activeEditor
      }
    })
  }

  const handlePreview = () => {
    divPreviewWrap.current.classList.toggle("maximized");
    if(divPreviewWrap.current.classList.contains("maximized")) {
      divEditorWrap.current.style.display = 'none'; 
    } else {
      divEditorWrap.current.style.display = 'block'; 
    }

    setActiveElements((prevState) => {
      return {
        ...prevState, 
        activePreview: !prevState?.activePreview
      }
    })
  }

  return (
    <div className="app">
      <div ref={divEditorWrap} className="editor-wrap" id="editor-wrap">
      <div className="toolbar">
        Editor   
        {!activeElements?.activeEditor && <BsArrowsFullscreen onClick={handleEditor} />}
        {activeElements?.activeEditor && <BsArrowsAngleExpand onClick={handleEditor} />}
      </div>
        <textarea name="editor" id="editor" value={content || ""} onChange={(e) => setContent(e.target.value)} />
      </div>

      <div ref={divPreviewWrap} className="preview-wrap" id="preview-wrap">
        <div className="toolbar">
          Preview 
          {!activeElements?.activePreview && <BsArrowsFullscreen onClick={handlePreview} />}
          {activeElements?.activePreview && <BsArrowsAngleExpand onClick={handlePreview} />}
        </div>
        <div id="preview" className="preview" dangerouslySetInnerHTML={
          {__html: marked(content)} 
        }>          
        </div>
      </div>
    </div>
  )
}

export default App;
