import LoginForm from "@/components/user/login";

export default function Login() {
  return (
    <main className="p-6 lg:mt-30">
      <div className="max-w-md mx-auto bg-[#0e1116] rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Entrar</h1>
        <p className="text-[#94a3b8] mb-8">
          Seja bem-vind_ de volta ao IcompHub!
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
