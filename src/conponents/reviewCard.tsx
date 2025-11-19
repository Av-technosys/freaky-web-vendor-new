
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui';
import { TiIconStarFilled } from './icons';

type reviewsProps={
    userReviews:any,
    drawerHandler:any
}

const ReviewCard = ({userReviews,drawerHandler}:reviewsProps) => {
    return (
        <>
        {userReviews?.map((review:any, index:number) => {
          return (
            <div key={index} className="col-span-1 ">
              <Card>
                <CardHeader>
                  <CardTitle className="w-full flex items-center justify-between">
                    <div className="w-2/3  flex items-center  gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={review.image}
                          alt="profile-picture"
                        />
                      </div>
                      <span className="text-[13px]">{review.name}</span>
                      <span className="text-[12px]">{review.date}</span>
                    </div>
                    <div className="w-1/3  flex items-center justify-center gap-1">
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                      <TiIconStarFilled size="14" color="gold" />
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>{review.review}</CardContent>
                <CardFooter className="w-full items-center justify-end">
                  <Button
                    onClick={() => drawerHandler(review)}
                    className="text-yellow-500"
                    variant="ghost"
                  >
                    View More
                  </Button>
                </CardFooter>
              </Card>
            </div>
          );
        })}
      </>
    );
}

export default ReviewCard;
