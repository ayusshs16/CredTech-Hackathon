
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const evaluationCriteria = [
    {
      title: "Data Engineering & Pipeline (20%)",
      content: "Robust ingestion, processing, scalability, reproducibility. How do you deal with failures at each step and handle those errors? How do you reduce latency and optimize your model when the data inflow is extremely high? How do you choose your features and input sources?"
    },
    {
      title: "Model Accuracy & Explainability (30%)",
      content: "How accurate are your model predictions? What kind of testing have you done in order to check the accuracy of your model? Is your testing strategy robust? Are the explanations being produced in line with your model output and input features?"
    },
    {
      title: "Dealing with Unstructured Data (12.5%)",
      content: "How do you effectively and meaningfully use unstructured event data? How well do you integrate the signals from objective and subjective data? Does integration of unstructured data boost the accuracy or explainability of the model?"
    },
    {
      title: "User Experience & Dashboard (15%)",
      content: "How intuitive is your dashboard? How well are you able to present useful data to an analyst to deliver insights?"
    },
    {
      title: "Deployment, Ops and Real-time updates (10%)",
      content: "Have you deployed the application? Does the model get updated frequently? What kinds of triggers are being used?"
    },
    {
      title: "Innovation (12.5%)",
      content: "Unique features, creative data sources, creative visualizations."
    },
    {
      title: "Attention to detail",
      content: "How do you ensure polish and accuracy across all aspects of your work - code correctness, error handling, edge-case coverage, tests, and documentation-so that no subtle issues slip through?"
    }
  ];
  
  export function EvaluationFocus() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Focus</CardTitle>
          <CardDescription>
            Key areas of focus for this solution based on the provided criteria.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {evaluationCriteria.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    );
  }
