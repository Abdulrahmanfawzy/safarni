// "use client";

// import * as React from "react";
// import { useForm } from "@tanstack/react-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   InputGroupTextarea,
// } from "@/components/ui/input-group";

// const formSchema = z.object({
//   title: z
//     .string()
//     .min(5, "Bug title must be at least 5 characters.")
//     .max(32, "Bug title must be at most 32 characters."),
//   description: z
//     .string()
//     .min(20, "Description must be at least 20 characters.")
//     .max(100, "Description must be at most 100 characters."),
// });

// export function FlightBookingForm() {
//   const form = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//     },
//     validators: {
//       onSubmit: formSchema,
//     },
//     onSubmit: async ({ value }) => {
//       toast("You submitted the following values:", {
//         description: (
//           <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
//             <code>{JSON.stringify(value, null, 2)}</code>
//           </pre>
//         ),
//         position: "bottom-right",
//         classNames: {
//           content: "flex flex-col gap-2",
//         },
//         style: {
//           "--border-radius": "calc(var(--radius)  + 4px)",
//         } as React.CSSProperties,
//       });
//     },
//   });

//   return (
//     <Card className="w-full sm:max-w-md">
//       <CardHeader>
//         <CardTitle>Bug Report</CardTitle>
//         <CardDescription>
//           Help us improve by reporting bugs you encounter.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form
//           id="bug-report-form"
//           onSubmit={e => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         >
//           <FieldGroup>
//             <form.Field
//               name="title"
//               children={field => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Bug Title</FieldLabel>
//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={e => field.handleChange(e.target.value)}
//                       aria-invalid={isInvalid}
//                       placeholder="Login button not working on mobile"
//                       autoComplete="off"
//                     />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//             <form.Field
//               name="description"
//               children={field => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Description</FieldLabel>
//                     <InputGroup>
//                       <InputGroupTextarea
//                         id={field.name}
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.value)}
//                         placeholder="I'm having an issue with the login button on mobile."
//                         rows={6}
//                         className="min-h-24 resize-none"
//                         aria-invalid={isInvalid}
//                       />
//                       <InputGroupAddon align="block-end">
//                         <InputGroupText className="tabular-nums">
//                           {field.state.value.length}/100 characters
//                         </InputGroupText>
//                       </InputGroupAddon>
//                     </InputGroup>
//                     <FieldDescription>
//                       Include steps to reproduce, expected behavior, and what
//                       actually happened.
//                     </FieldDescription>
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//           </FieldGroup>
//         </form>
//       </CardContent>
//       <CardFooter>
//         <Field orientation="horizontal">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => form.reset()}
//           >
//             Reset
//           </Button>
//           <Button
//             type="submit"
//             form="bug-report-form"
//           >
//             Submit
//           </Button>
//         </Field>
//       </CardFooter>
//     </Card>
//   );
// }


"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import  Plane  from "@/assets/plane.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  tripType: z.enum(["round", "multi", "oneway"]),
  location: z.string().min(6),
  destination: z.string().min(6),
  departure: z.string(),
//   return: z.string().optional(),
  return: z.string(),
  passengers: z.string(),
});

export function FlightBookingForm() {
  const form = useForm({
    defaultValues: {
      tripType: "round",
      location: "",
      destination: "",
      departure: "",
      return: "",
      passengers: "1",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: ({ value }) => {
      console.log("Search Flights:", value);
    },
  });


  return (
    <div className="flex w-full items-center justify-center p-4 flex-column gap-30">
      <div className="">
        <img
          src={Plane}
          alt="plane"
        />
      </div>
      <Card className="w-full max-w-md rounded-2xl border-none shadow-none bg-transparent">
        <CardContent className="space-y-8 p-0">
          {/* Trip Type */}
          <form.Field
            name="tripType"
            children={field => (
              <Tabs
                value={field.state.value}
                onValueChange={v => field.handleChange(v as any)}
              >
                <TabsList className="grid grid-cols-3 rounded-full bg-color-none gap-5">
                  <TabsTrigger
                    value="round"
                    className="rounded-full bg-muted data-[state=active]:bg-green-50 data-[state=active]:text-blue-600 p-4"
                  >
                    🔄 Round Trip
                  </TabsTrigger>
                  <TabsTrigger
                    value="multi"
                    className="rounded-full bg-muted data-[state=active]:bg-green-50 data-[state=active]:text-blue-600 p-4"
                  >
                    🔁 Multi City
                  </TabsTrigger>
                  <TabsTrigger
                    value="oneway"
                    className="rounded-full bg-muted data-[state=active]:bg-green-50 data-[state=active]:text-blue-600 p-4"
                  >
                    ➡ One Way
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          />

          {/* Location */}
          <form.Field
            name="location"
            children={field => (
              <Field>
                <FieldLabel>Location</FieldLabel>
                <Input
                  placeholder="Montreal, Canada"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className="rounded-sm"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {/* Destination */}
          <form.Field
            name="destination"
            children={field => (
              <Field>
                <FieldLabel>Destination</FieldLabel>
                <Input
                  placeholder="Tokyo, Japan"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                  className="rounded-sm"
                />
              </Field>
            )}
          />

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="departure"
              children={field => (
                <Field>
                  <FieldLabel>Departure</FieldLabel>
                  <Input
                    type="date"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    className="rounded-sm"
                  />
                </Field>
              )}
            />

            {form.state.values.tripType === "round" && (
              <form.Field
                name="return"
                children={field => (
                  <Field>
                    <FieldLabel>Return</FieldLabel>
                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={e => field.handleChange(e.target.value)}
                      className="rounded-sm"
                    />
                  </Field>
                )}
              />
            )}
          </div>

          {/* Passengers */}
          <form.Field
            name="passengers"
            children={field => (
              <Field>
                <FieldLabel>Passenger</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger className="rounded-sm">
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Passenger</SelectItem>
                    <SelectItem value="2">2 Passengers</SelectItem>
                    <SelectItem value="3">3 Passengers</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          {/* Button */}
          <Button
            className="w-full rounded-sm bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700"
            onClick={form.handleSubmit}
          >
            Search Flights
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
