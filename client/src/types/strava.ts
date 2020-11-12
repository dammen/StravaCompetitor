

export type TokenPayload = {
    token_type: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    access_token: string;
    athlete: Athlete;
}

export type Athlete = {
    id: number;
    username: string; 
    resource_state: ResourceState;
    firstname:string;
    lastname: string;
    city: string;
    country: string;
    sex: Sex;
    summit:boolean;
    created_at: string; 
    updated_at: string;
    badge_type_id: number; 
    profile_medium: string; 
    profile: string;
    friend: number | null;
    follower: number | null
}

export enum ResourceState {
    "meta" = 1,
    "summary" = 2,
    "detail" = 3
}

export enum Sex {
    "M",
    "F"
}


export enum ActivityType {
    AlpineSki = 'AlpineSki',
    BackcountrySki = 'BackcountrySki',
    Canoeing = 'Canoeing',
    Crossfit = 'Crossfit',
    EBikeRide = 'EBikeRide',
    Elliptical = 'Elliptical',
    Hike = 'Hike',
    IceSkate = 'IceSkate',
    InlineSkate = 'InlineSkate',
    Kayaking = 'Kayaking',
    Kitesurf = 'Kitesurf',
    NordicSki = 'NordicSki',
    Ride = 'Ride',
    RockClimbing = 'RockClimbing',
    RollerSki = 'RollerSki',
    Rowing = 'Rowing',
    Run = 'Run',
    Snowboard = 'Snowboard',
    Snowshoe = 'Snowshoe',
    StairStepper = 'StairStepper',
    StandUpPaddling = 'StandUpPaddling',
    Surfing = 'Surfing',
    Swim = 'Swim',
    VirtualRide = 'VirtualRide',
    Walk = 'Walk',
    WeightTraining = 'WeightTraining',
    Windsurf = 'Windsurf',
    Workout = 'Workout',
    Yoga = 'Yoga'
  }
  
  export interface MetaAthlete {
    id: number;
  }

export interface PolylineMap {
    id: string;
    polyline: string;
    summary_polyline: string;
  }
  
export interface SummaryActivity {
  id: number;
  external_id: string;
  upload_id: number;
  athlete: MetaAthlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  elev_high: number;
  elev_low: number;
  type: ActivityType;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  start_latlng: number[];
  end_latlng: number[];
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  total_photo_count: number;
  map: PolylineMap;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  workout_type: number;
  average_speed: number;
  max_speed: number;
  has_kudoed: boolean;
}