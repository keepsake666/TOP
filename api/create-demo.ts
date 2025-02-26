import { IReviewForm, IReviewSentResponse } from "@/app/(site)/components/review-form/ReviewForm.interface";
import { API } from "@/app/api";

export async function postDemo(
  productId: string,
  formData: IReviewForm
): Promise<IReviewSentResponse> {
  const res = await fetch(API.review.createDemo, {
    method: "POST",
    body: JSON.stringify({
      productId,
      ...formData,
    }),
    headers: new Headers({ "content-type": "application/json" }),
  });
  return res.json();
}
