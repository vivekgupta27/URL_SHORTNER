const express=require('express');
const app =express();
const short=require('./models/url')
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));


app.get('/',async(req,res)=>{
    const shorturl=await short.find();
    res.render("index.ejs",{shorturl:shorturl});
})

app.post('/shorten',async (req,res)=>{
    const body=req.body;
    try {
        await short.create({
            full: body.fullUrl,
        });
        res.redirect('/');
    } catch (err) {
        // If there's a duplicate entry, handle the error
        console.error("Duplicate entry detected");
        const shorturl = await short.find(); // Re-fetch the short URLs to render on the page
        // Render the same page but include the error message
        res.render('index.ejs', { shorturl: shorturl, errorMessage: 'This URL already exists. Please try another one.' });
    }
})

app.get('/:shortUrl',async(req,res)=>{
   const shorturl=await short.findOne({short:req.params.shortUrl});
   if(shorturl==null) return res.sendStatus(404);
   shorturl.click++;
   shorturl.save();
   res.redirect(shorturl.full);
})

app.listen(3000,()=>{
    console.log("Server is set up")
})