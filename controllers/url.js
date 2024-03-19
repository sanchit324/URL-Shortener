const shortid  = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error : "url is required"})

    const entry = URL.findOne({
        longUrl: body.url
    })

    // if(entry) return res.json({
    //     msg: "url already generated"
    // })

    if(entry) return res.json({shortid : entry.shortUrl})

    const shortId = shortid(8);
    await URL.create({
        shortUrl: shortId,
        longUrl: body.url,
        totalClicks: [],
        createdBy: req.user._id
    });
    return res.render("home", {
        id: shortId
    })
    // return res.json({ id : shortId});
}


async function handleRedirectToLongUrl(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortUrl: shortId
    }, {
        $push : {
            totalClicks: {
                timestamps : Date.now()
            }
        }
    })
    if(entry) {
        res.redirect(entry.longUrl)
    } else {
        res.status(404).json({ error: "Short URL not found" });
    }
    
}

async function handleGetAnalytics(req,res) { 
    const shortId = req.params.shortId;
    const entry = await URL.findOne({
        shortUrl: shortId
    });
    return res.json({
        totalClicks: entry.totalClicks.length,
        analytics: entry.totalClicks
    })
}

module.exports = {
    handleGenerateNewShortUrl, handleRedirectToLongUrl, handleGetAnalytics
};