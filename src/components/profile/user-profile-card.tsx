
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '../ui/badge';
import Image from 'next/image';

export function UserProfileCard() {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Avatar className="h-24 w-24 mb-2">
          <Image 
            src="https://placehold.co/100x100.png" 
            alt="User Avatar"
            width={100}
            height={100}
            data-ai-hint="person"
          />
        </Avatar>
        <CardTitle>Alex Doe</CardTitle>
        <p className="text-muted-foreground">alex.doe@example.com</p>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Credit Analyst at Acme Financial. Focused on emerging market risks.
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <Badge variant="secondary">Risk Analysis</Badge>
          <Badge variant="secondary">Data Modeling</Badge>
        </div>
        <Button>Edit Profile</Button>
      </CardContent>
    </Card>
  );
}
