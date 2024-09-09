import React from 'react';
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const mockRepos = [
  { name: 'cdx-ios-app', description: 'Repository for iOS Development.', status: 'Active' },
  { name: 'web-dashboard', description: 'Main web dashboard project.', status: 'Active' },
  { name: 'data-analytics', description: 'Data analytics tools and scripts.', status: 'Inactive' },
  { name: 'api-gateway', description: 'API Gateway service.', status: 'Active' },
  { name: 'mobile-app', description: 'Cross-platform mobile application.', status: 'Active' },
  { name: 'legacy-system', description: 'Maintenance of legacy systems.', status: 'Archived' },
];

const getRandomRepos = (count: number) => {
  const shuffled = [...mockRepos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-lightGreen text-darkGreen';
    case 'inactive':
      return 'bg-secondary text-red';
    case 'archived':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

type RepoCardProps = React.ComponentProps<typeof Card> & {
  repoCount?: number;
};

export function RepoCard({ className, repoCount = 6, ...props }: RepoCardProps) {
  const repos = getRandomRepos(repoCount);

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
        <CardDescription className='mt-4'>Active repos for this user</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {repos.map((repo, index) => (
            <div key={index} className="flex flex-col justify-between rounded-lg border p-3 lg:p-4">
              <div className="flex items-center space-x-3 lg:space-x-4 mb-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`/repo/${(index % 4) + 1}.svg`}
                  alt=""
                />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none lg:leading-none break-all lg:break-normal">
                    {repo.name}
                  </p>
                </div>
              </div>
              <p className="text-xs mt-1 text-muted-foreground mb-2 lg:mb-3 line-clamp-2 lg:line-clamp-none">
                {repo.description}
              </p>
              <Badge className={`${getStatusColor(repo.status)} self-start`}>{repo.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}