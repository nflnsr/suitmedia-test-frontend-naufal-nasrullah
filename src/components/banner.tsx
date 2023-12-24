import "@/styles/banner.module.css";

export function Banner() {
  const getBannerImg = "https://images.alphacoders.com/133/1331862.png"

  return (
    <>
      <section id="hero-section" className="">
        <div className="relative w-full h-[500px]">
          <img
            src={getBannerImg}
            alt="banner"
            className="absolute h-[500px] w-full object-cover -z-10"
            loading="lazy"
          />
          <div className="flex h-full flex-col items-center justify-center text-white text-center">
            <h1 className="text-5xl">Ideas</h1>
            <p className="text-lg">Where all our great things begin</p>
          </div>
        </div>
      </section>
    </>
  );
}
