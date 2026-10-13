// TEMPORARY: delete after Phase 1 verification
import { createExampleSchema, type CreateExampleInput } from "@app/types";

const sample: CreateExampleInput = createExampleSchema.parse({
  name: "Sample",
  status: "draft",
});

void sample;
