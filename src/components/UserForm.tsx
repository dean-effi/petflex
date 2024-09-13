export default function UserForm() {
  const error = false;
  return (
    <main className="relative m-auto h-[90vh] w-[300px] overflow-visible py-10 text-blue-800">
      <section
        aria-label="header"
        className="header text-center font-extrabold"
      >
        <p className="grid">
          Sign up to
          <span className="text-6xl tracking-widest"> petflex</span>
        </p>
        <img
          className="m-auto mt-2 w-[135px]"
          src="/logo.svg"
          alt="petflex logo"
        />
      </section>
      <section className="registeration mt-12">
        <form
          action=""
          onSubmit={e => e.preventDefault()}
          className="mt-auto grid gap-5"
        >
          <label className="grid gap-2 font-bold">
            Username:
            <input
              type="text"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <label className="grid gap-2 font-bold">
            Password:
            <input
              type="password"
              className="rounded-lg bg-stone-300 p-2 font-normal text-stone-800"
            />
          </label>
          <div className="text-center font-bold text-red-800">
            {error && (
              <p className="">
                Username must contain between 5 and 20 characters{" "}
                <br></br>
              </p>
            )}
          </div>

          <div className="absolute bottom-4 m-auto grid w-full gap-4 text-center">
            <button
              type="submit"
              className="m-auto rounded-[20px] bg-blue-800 p-2 px-5 text-xl font-bold text-stone-100"
            >
              Sign up
            </button>
            <p>
              Don't have an account?{" "}
              <span className="font-extrabold">Sign up</span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}
