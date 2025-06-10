interface ParticipantsProps {
  // participants: UserProps[];
  participants: string[];
}

// //temporario
// interface UserProps {
//   name: string;
//   role: string;
//   github: boolean;
//   linkedin: boolean;
// }

export function MembersList({ participants }: ParticipantsProps) {
  return (
    <div className="space-y-2 mb-8">
      {participants.map((participant: string, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between p-2.5 bg-[#080D17] rounded-lg border border-[#1A222F]"
        >
          <div className="font-medium">{participant}</div>
          {/* <div className="flex items-center">
            <span className="text-[#64748b] text-sm mr-4">
              {participant.role}
            </span>
            <div className="flex space-x-2">
              {participant.github && (
                <Link href="#" className="text-[#f1f5f9] hover:text-[#64748b]">
                  <GithubIcon size={20} />
                </Link>
              )}
              {participant.linkedin && (
                <Link href="#" className="text-[#f1f5f9] hover:text-[#64748b]">
                  <LinkedinIcon size={20} />
                </Link>
              )}
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
}
