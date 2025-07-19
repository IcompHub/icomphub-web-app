import UserProfile from "@/components/user/profile";
import { getProfile, listarUsuario } from "@/lib/api/sign-up";

// Esta é a sua página. Ela é um Server Component e pode ser async.
export default async function ProfilePage() {
  // 1. Busque os dados do usuário no servidor.
  // Isso é mais seguro, especialmente para obter tokens ou dados sensíveis.
  // A função `getUserData` deve retornar um objeto com o formato `UserInfo`.

  const profile = await listarUsuario();
  const profile_picture = await getProfile();
  // 2. Se não houver perfil, mostre uma mensagem ou redirecione.
  if (!profile) {
    return <div>Usuário não encontrado.</div>;
  }
  // 3. Renderize o componente de cliente, passando os dados buscados como props.
  return <UserProfile profile={profile} profile_picture={profile_picture} />;
}
