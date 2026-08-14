export default function SobreComponent(props: any) {
  return (
    <main className="relative h-screen w-screen bg-white">
      <header className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-2xl bg-red-600 px-6 py-2 font-semibold text-white whitespace-nowrap">
        <p>HISTORIA</p>
      </header>
      <section className="w-full h-full flex mb-4 gap-2">
        <div className="py-6 px-2 bg-zinc-300 flex w-1/2 h-12">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil tenetur inventore odit iusto dicta magnam provident ducimus, iste modi suscipit consequuntur placeat laboriosam totam blanditiis nulla mollitia ipsa asperiores recusandae nesciunt ratione facere non in sunt sed! Eum quod deleniti, saepe possimus quia exercitationem tempora sed unde earum est provident ab, iusto, laudantium aliquid quasi in ea debitis iste officiis.
            </p>
        </div>
        <div className="py-6 px-2 bg-zinc-400 flex w-1/2 h-12">
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil tenetur inventore odit iusto dicta magnam provident ducimus, iste modi suscipit consequuntur placeat laboriosam totam blanditiis nulla mollitia ipsa asperiores recusandae nesciunt ratione facere non in sunt sed! Eum quod deleniti, saepe possimus quia exercitationem tempora sed unde earum est provident ab, iusto, laudantium aliquid quasi in ea debitis iste officiis.
            </p>
        </div>
      </section>
    </main>
  );
}
