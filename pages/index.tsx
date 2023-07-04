import FileUpload from '@/components/file-upload'
import FileVisualize from '@/components/file-visualize'
import Header from '@/components/layout/header'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [jsonString, setJsonString] = useState<string | undefined>(undefined)
  const fileLoaded = jsonString !== undefined

  function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const fileReader = new FileReader()
    fileReader.onloadend = (e) => {
      const content = fileReader.result
      setJsonString(content as string)
    }
    if (e && e.target && e.target.files) {
      fileReader.readAsText(e.target.files[0])
    }
  }

  return (
    <main className={`min-h-screen bg-neutral-100 ${inter.className}`}>
      <Header loadFile={loadFile} />
      {fileLoaded ? (
        <FileVisualize file={jsonString}></FileVisualize>
      ) : (
        <FileUpload loadFile={loadFile} />
      )}
    </main>
  )
}
