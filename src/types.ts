export interface User {
  sub: string;
  iat: number;
  nbf: number;
  jti: string;
  exp: number;
  type: string;
  fresh: boolean;
  role: string;
}

// UserDetails
// {"id":"64541f77027f3a905e2bd3e8","email":"stavan@gmail.com","first_name":"Stavan","last_name":"Patel","role":"Member","disabled":false,"membership_plan":"Free","free_days":20,"checked_in":false,"classes":[{"id":"6455adac181e59a12883b4da","collection":"Class"}],"activities":[{"_id":"a5b16c6b-5dd3-418a-a06e-c71cb00ae50e","name":"Yoga","start_time":"2023-05-03T14:20:45.965000","end_time":"2023-05-03T14:40:45.965000","location":"San Jose"},{"_id":"1dc3cf65-43be-4f9b-b1c9-898c85975792","name":"Yoga","start_time":"2023-05-03T14:20:45.965000","end_time":"2023-05-03T14:40:45.965000","location":"San Jose"}],"check_ins":[{"check_in":"2023-05-04T14:20:45.965000","check_out":"2023-05-04T14:20:51.845000"},{"check_in":"2023-05-04T14:20:55.489000","check_out":"2023-05-04T14:20:58.920000"},{"check_in":"2023-05-05T19:07:34.426000","check_out":"2023-05-05T19:07:38.350000"}]}

export interface Class {
  _id: string;
  name: string;
  time: string;
  location: string;
  instructor: string;
  description: string;
  duration: number;
}
export interface UserDetails {
  id: string;
  user_email: string;
  first_name: string;
  last_name: string;
  role: string;
  disabled: boolean;
  membership_plan: string;
  free_days: number;
  checked_in: boolean;
  classes: Class[];
  activities: any[];
  check_ins: any[];
}

export interface WorkoutDetails {
  _id: string;
  name: string;
  start_time: string;
  end_time: string;
  location: string;
}

// {
//     "_id": "6459a9e4a2890f06caa2f16e",
//     "user_email": "Stavan@gmail.com",
//     "membership_plan": "Free",
//     "free_days": 15,
//     "checked_in": false,
//     "classes": [
//       {
//         "id": "6459a7e2a2890f06caa2f165",
//         "collection": "Class"
//       },
//       {
//         "id": "6459a7dba2890f06caa2f164",
//         "collection": "Class"
//       },
//       {
//         "id": "6459a7eaa2890f06caa2f166",
//         "collection": "Class"
//       }
//     ],
//     "activities": [],
//     "check_ins": [
//       {
//         "check_in": "2023-05-08T20:23:29.879000",
//         "check_out": "2023-05-08T20:26:21.566000"
//       }
//     ]
//   }

export interface ClassSchedule
{
  "_id": string,
  "name": string,
  "time": string,
  "enrollment": number,
  "duration": number,
  "instructor": string | null,
  "description": string | null,
  "location": string
}
