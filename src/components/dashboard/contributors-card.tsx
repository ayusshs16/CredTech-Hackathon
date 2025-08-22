
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const contributors = [
    {
        name: 'Jatin Thakur',
        githubUser: 'jatinthakur19june-eng',
    },
    {
        name: 'Jay Gupta',
        githubUser: 'Jaygupta09',
        website: 'https://www.linkedin.com/in/jay-gupta-197047309',
    },
    {
        name: 'Ayush Srivastava',
        githubUser: 'ayusshs16',
        website: 'https://www.linkedin.com/in/ayusshsrivastava16/',
    }
];

export function ContributorsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contributors</CardTitle>
        <CardDescription>
          A big thank you to our talented contributors!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {contributors.map((contributor) => (
                 <div key={contributor.githubUser} className="flex flex-col items-center text-center gap-2">
                     <Link href={`https://github.com/${contributor.githubUser}`} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={`https://github.com/${contributor.githubUser}.png?size=100`}
                            alt={`${contributor.name}'s avatar'`}
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                     </Link>
                    <div className="font-semibold">{contributor.name}</div>
                    {contributor.website && (
                         <Link href={contributor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                            Website
                        </Link>
                    )}
                 </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
