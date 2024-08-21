import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()
const PORT = process.env.PORT || 8000

app.get('/',(req,res)=>{

    
    const currentdate = new Date();
    const timestamp = currentdate.toISOString();
    const fileName = timestamp.split('T')
    const date = fileName[0]
    const time = fileName[1]
    const onlytime = time.slice(0,8)
     const finaltime = onlytime.replace(/:/g, '-')
    
    const updatedFileName = `${date}-${finaltime}.txt`
    console.log(updatedFileName)

    const currentpath = process.cwd()
    const folderpath = path.join(currentpath, 'files')
    const filepath = path.join(folderpath,updatedFileName )
   if(!fs.existsSync(folderpath)){
    fs.mkdirSync(folderpath, { recursive: true })
   }
    fs.writeFile(filepath ,`${timestamp}`, 'UTF-8', (err)=>{
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File created successfully');
            res.send({
                message:"File created successfully",
                fileName:`${updatedFileName}`,
                fileContent:`${timestamp}`,
            })
        }
    })
})

app.listen(PORT, ()=>console.log(`app is listening to port ${PORT}`))