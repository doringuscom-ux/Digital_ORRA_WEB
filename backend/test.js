const test = async () => {
  const url = "https://script.google.com/macros/s/AKfycbzUoCZRVPGT3cM6sLDtjrmh-iswBf50HpcswKfl1UvE_Wo13c_FTgWjhkHWymPUEcFw/exec";
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: "dogdwdev@gmail.com", subject: "Test OTP via Script", body: "This is a test OTP from backend." })
    });
    const text = await res.text();
    console.log(text);
  } catch (err) {
    console.error(err);
  }
};
test();
