export interface Plan {
  name: string;
  amount: number; 
  currency: string; 
  interval: string;
  isPopular?: boolean;
  description: string;
  features : string[]
}


export const availablePlans: Plan[] = [
    {
        name: "Weekly Plan", 
        amount: 9.99,          
        currency: "USD",
        interval: "week",   
        description: "Great if you wnat to try the service before commiting longer",
        features: [
            "Unlimited AI meal plans",
            "AI nutrition insights",  
            "Cancel anytime"
        ],
    },
    {
        name: "Monthly Plan", 
        amount: 39.99,          
        currency: "USD",
        interval: "month", 
        isPopular: true,  
        description: "Perfect for ongoing use and flexibility",
        features: [
            "Unlimited AI meal plans",
            "Priority support",  
            "Cancel anytime"
        ],
    },
    {
        name: "Yearly Plan", 
        amount: 299.99,          
        currency: "USD",
        interval: "year",   
        description: "Great if you wnat to try the service before commiting longer",
        features: [
            "Unlimited AI meal plans",
            "VIP support",  
            "Cancel anytime"
        ],
    },

]

const priceIDMap: Record<string, string> = {
    week:process.env.STRIPE_PRICE_WEEKLY!,
    month:process.env.STRIPE_PRICE_MONTHLY!,
    year:process.env.STRIPE_PRICE_YEARLY!
}


export const getPriceIDFromType = (planType: string) => priceIDMap[planType];
