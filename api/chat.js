export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = String(body?.prompt || "").trim();
    const image = body?.image;
    if (!prompt && !image) return Response.json({error:"اكتبي السؤال أولا."},{status:400});

    const key = process.env.OPENAI_API_KEY;
    if (!key) return Response.json({error:"OPENAI_API_KEY غير مضبوط في Vercel."},{status:500});

    const content = [{type:"input_text", text:prompt || "حللي الصورة وفسري السؤال خطوة بخطوة بالعربية."}];
    if (image) content.push({type:"input_image", image_url:image});

    const upstream = await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${key}`},
      body:JSON.stringify({
        model:"gpt-5.6-luna",
        input:[{
          role:"user",
          content
        }]
      })
    });
    const data=await upstream.json();
    if(!upstream.ok) return Response.json({error:data?.error?.message||"فشل الاتصال بخدمة الذكاء الاصطناعي."},{status:upstream.status});
    const text = (data.output||[])
      .flatMap(x=>x.content||[])
      .filter(x=>x.type==="output_text")
      .map(x=>x.text)
      .join("\n")
      .trim();
    return Response.json({text:text||"لم يصل نص من النموذج."});
  } catch (e) {
    return Response.json({error:"حدث خطأ في خادم المساعد الذكي."},{status:500});
  }
}
