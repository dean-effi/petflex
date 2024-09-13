export default function UserForm() {
  return (
    <div className="m-auto w-[70%] py-10">
      <section className="header text-center font-extrabold text-blue-800">
        <p className="grid">
          Sign up to
          <span className="text-6xl tracking-widest"> petflex</span>
        </p>
        <img
          className="m-auto mt-2 w-[115px]"
          src="/logo.svg"
          alt="petflex logo"
        />
      </section>
      <section className="registeration mt-24">
        <form
          action=""
          onSubmit={e => e.preventDefault()}
          className="grid gap-5"
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
        </form>
      </section>
    </div>
  );
}
