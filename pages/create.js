import Link from "next/link";

export default function Create() {
  return (
    <>
      <section
        id="subheader"
        className="text-light"
        // data-bgimage="url(/images/background/subheader.jpg) top"
        style={{ 'background': "url(/images/background/subheader.jpg) " }}
      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Create Collectible</h1>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <p>
              Choose "Single" if you want your collectible to be one of a kind
              or "Multiple" if you want to sell one collectible times
            </p>
            <Link href="/create-item">
                <a className="opt-create">
                <img src="./images/misc/coll-single.png" alt="" />
              <h3>Single</h3>
                </a>
            </Link>
            <Link href="/create-multiple" >
                <a className="opt-create">
                <img src="./images/misc/coll-multiple.png" alt="" />
              <h3>Multiple</h3>
                </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
