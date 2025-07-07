import { Members } from "@/lib/api/project";

interface MembersListProps {
  participants?: Members[];
}

export function MembersList({ participants }: MembersListProps) {

    if (!participants || participants.length === 0) {
    return <div className="mb-8">Nenhum participante encontrado.</div>;
  }
  
  return (
    <div className="space-y-2 mb-8">
      {participants.map((member: Members) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-2.5 bg-[#080D17] rounded-lg border border-[#1A222F]"
        >
          <div className="font-medium">{member.nickname}</div>
        </div>
      ))}
    </div>
  );
}