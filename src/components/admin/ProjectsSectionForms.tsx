"use client";

import { useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SectionSaveFooter from "@/components/admin/SectionSaveFooter";
import {
  ProjectCapabilityIconPicker,
  type ProjectCapabilityIconKind,
} from "@/components/projects/ProjectCapabilityIcon";
import {
  DEFAULT_PROJECTS_CAPABILITIES,
  DEFAULT_PROJECTS_HERO,
  DEFAULT_PROJECTS_PORTFOLIO,
} from "@/data/projects-reference";

type SectionRow = {
  id: string;
  type: string;
  order: number;
  data: Record<string, unknown>;
};

type SectionFormProps = {
  section: SectionRow;
  onSave: (data: Record<string, unknown>) => void;
  previewHref: string;
  saveMessage?: string | null;
  saveMessageTone?: "success" | "error";
};

function SectionHeading({ section }: { section: SectionRow }) {
  return (
    <h3>
      {section.type}{" "}
      <span className="admin-muted" style={{ fontWeight: 400 }}>
        (order {section.order}, id {section.id})
      </span>
    </h3>
  );
}

const formStyle = {
  marginBottom: 24,
  paddingBottom: 24,
  borderBottom: "1px solid #e2e8f0",
} as const;

const itemStyle = {
  marginBottom: 16,
  padding: 16,
  border: "1px solid #e2e8f0",
  borderRadius: 12,
} as const;

type ProjectsHeroFormValues = {
  titleLines: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  backgroundImage: string;
};

function toProjectsHeroDefaultValues(data: Record<string, unknown>): ProjectsHeroFormValues {
  const titleLines = Array.isArray(data.titleLines)
    ? (data.titleLines as string[])
    : DEFAULT_PROJECTS_HERO.titleLines;
  const action = (data.action as Record<string, unknown> | undefined) ?? DEFAULT_PROJECTS_HERO.action;

  return {
    titleLines: titleLines.join("\n"),
    description: (data.description as string) ?? DEFAULT_PROJECTS_HERO.description,
    actionLabel: (action.label as string) ?? DEFAULT_PROJECTS_HERO.action.label,
    actionHref: (action.href as string) ?? DEFAULT_PROJECTS_HERO.action.href,
    backgroundImage:
      (data.backgroundImage as string) ?? DEFAULT_PROJECTS_HERO.backgroundImage ?? "",
  };
}

export function ProjectsHeroSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: SectionFormProps) {
  const defaultValues = useMemo(
    () => toProjectsHeroDefaultValues(section.data),
    [section.data],
  );
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectsHeroFormValues>({ defaultValues });
  const backgroundImage = watch("backgroundImage");

  function handleValid(values: ProjectsHeroFormValues) {
    onSave({
      titleLines: values.titleLines
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      description: values.description,
      action: { label: values.actionLabel, href: values.actionHref },
      backgroundImage: values.backgroundImage,
    });
  }

  return (
    <form
      className="admin-form admin-section-form"
      onSubmit={handleSubmit(handleValid)}
      style={formStyle}
    >
      <SectionHeading section={section} />

      <label>
        Title lines (one per line)
        <textarea rows={3} {...register("titleLines", { required: "Title is required" })} />
        {errors.titleLines ? (
          <p className="admin-field-error">{errors.titleLines.message}</p>
        ) : null}
      </label>

      <label>
        Description
        <textarea rows={4} {...register("description", { required: "Description is required" })} />
        {errors.description ? (
          <p className="admin-field-error">{errors.description.message}</p>
        ) : null}
      </label>

      <div className="admin-section-group">
        <h4>Call to action</h4>
        <label>
          Button label
          <input {...register("actionLabel", { required: "Button label is required" })} />
        </label>
        <label>
          Button link
          <input {...register("actionHref", { required: "Button link is required" })} />
        </label>
      </div>

      <input type="hidden" {...register("backgroundImage")} />
      <ImageUploadField
        label="Background image URL"
        value={backgroundImage}
        onChange={(value) =>
          setValue("backgroundImage", value, { shouldDirty: true, shouldValidate: true })
        }
        folder={`sections/${section.type}`}
        placeholder={DEFAULT_PROJECTS_HERO.backgroundImage}
      />

      <SectionSaveFooter
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
        previewHref={previewHref}
      />
    </form>
  );
}

type CapabilityItemFormValue = {
  icon: string;
  title: string;
  description: string;
};

type ProjectsCapabilitiesFormValues = {
  title: string;
  items: CapabilityItemFormValue[];
};

function toProjectsCapabilitiesDefaultValues(
  data: Record<string, unknown>,
): ProjectsCapabilitiesFormValues {
  const rawItems = Array.isArray(data.items)
    ? (data.items as Record<string, unknown>[])
    : DEFAULT_PROJECTS_CAPABILITIES.items;

  return {
    title: (data.title as string) ?? DEFAULT_PROJECTS_CAPABILITIES.title,
    items:
      rawItems.length > 0
        ? rawItems.map((item) => ({
            icon: (item.icon as string) ?? "network",
            title: (item.title as string) ?? "",
            description: (item.description as string) ?? "",
          }))
        : DEFAULT_PROJECTS_CAPABILITIES.items.map((item) => ({
            icon: item.icon ?? "network",
            title: item.title,
            description: item.description,
          })),
  };
}

export function ProjectsCapabilitiesSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: SectionFormProps) {
  const defaultValues = useMemo(
    () => toProjectsCapabilitiesDefaultValues(section.data),
    [section.data],
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProjectsCapabilitiesFormValues>({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  function handleValid(values: ProjectsCapabilitiesFormValues) {
    onSave({
      title: values.title,
      items: values.items.map((item) => ({
        icon: item.icon,
        title: item.title,
        description: item.description,
      })),
    });
  }

  return (
    <form
      className="admin-form admin-section-form"
      onSubmit={handleSubmit(handleValid)}
      style={formStyle}
    >
      <SectionHeading section={section} />

      <label>
        Section title
        <input {...register("title", { required: "Title is required" })} />
      </label>

      <div>
        <h4>Capabilities</h4>
        {fields.map((field, index) => (
          <div key={field.id} style={itemStyle}>
            <label>
              Icon
              <Controller
                control={control}
                name={`items.${index}.icon`}
                rules={{ required: true }}
                render={({ field }) => (
                  <ProjectCapabilityIconPicker
                    value={field.value}
                    onChange={(value) => field.onChange(value as ProjectCapabilityIconKind)}
                  />
                )}
              />
            </label>
            <label>
              Title
              <input {...register(`items.${index}.title`, { required: true })} />
            </label>
            <label>
              Description
              <textarea rows={3} {...register(`items.${index}.description`)} />
            </label>
            <button type="button" onClick={() => remove(index)} disabled={fields.length === 1}>
              Remove capability
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-button-secondary"
          onClick={() =>
            append({ icon: "network", title: "", description: "" })
          }
        >
          Add capability
        </button>
      </div>

      <SectionSaveFooter
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
        previewHref={previewHref}
      />
    </form>
  );
}

type PortfolioItemFormValue = {
  badge: string;
  title: string;
  image: string;
  challengeLabel: string;
  challenge: string;
  solutionLabel: string;
  solution: string;
  metric1Value: string;
  metric1Label: string;
  metric2Value: string;
  metric2Label: string;
  reverse: boolean;
};

type ProjectsPortfolioFormValues = {
  items: PortfolioItemFormValue[];
};

function toPortfolioItemValues(item: Record<string, unknown>): PortfolioItemFormValue {
  const metrics = Array.isArray(item.metrics)
    ? (item.metrics as Record<string, unknown>[])
    : [];

  return {
    badge: (item.badge as string) ?? "",
    title: (item.title as string) ?? "",
    image: (item.image as string) ?? "",
    challengeLabel: (item.challengeLabel as string) ?? "The Challenge",
    challenge: (item.challenge as string) ?? "",
    solutionLabel: (item.solutionLabel as string) ?? "The Solution",
    solution: (item.solution as string) ?? "",
    metric1Value: (metrics[0]?.value as string) ?? "",
    metric1Label: (metrics[0]?.label as string) ?? "",
    metric2Value: (metrics[1]?.value as string) ?? "",
    metric2Label: (metrics[1]?.label as string) ?? "",
    reverse: Boolean(item.reverse),
  };
}

function toProjectsPortfolioDefaultValues(
  data: Record<string, unknown>,
): ProjectsPortfolioFormValues {
  const rawItems = Array.isArray(data.items)
    ? (data.items as Record<string, unknown>[])
    : DEFAULT_PROJECTS_PORTFOLIO.items;

  return {
    items:
      rawItems.length > 0
        ? rawItems.map((item) => toPortfolioItemValues(item))
        : DEFAULT_PROJECTS_PORTFOLIO.items.map((item) =>
            toPortfolioItemValues(item as unknown as Record<string, unknown>),
          ),
  };
}

function emptyPortfolioItem(reverse = false): PortfolioItemFormValue {
  return {
    badge: "",
    title: "",
    image: "",
    challengeLabel: "The Challenge",
    challenge: "",
    solutionLabel: "The Solution",
    solution: "",
    metric1Value: "",
    metric1Label: "",
    metric2Value: "",
    metric2Label: "",
    reverse,
  };
}

function PortfolioItemFields({
  index,
  register,
  setValue,
  watch,
  sectionType,
}: {
  index: number;
  register: ReturnType<typeof useForm<ProjectsPortfolioFormValues>>["register"];
  setValue: ReturnType<typeof useForm<ProjectsPortfolioFormValues>>["setValue"];
  watch: ReturnType<typeof useForm<ProjectsPortfolioFormValues>>["watch"];
  sectionType: string;
}) {
  const image = watch(`items.${index}.image`);

  return (
    <>
      <label>
        Category badge
        <input {...register(`items.${index}.badge`, { required: true })} placeholder="Cybersecurity" />
      </label>
      <label>
        Project title
        <input {...register(`items.${index}.title`, { required: true })} />
      </label>
      <input type="hidden" {...register(`items.${index}.image`, { required: true })} />
      <ImageUploadField
        label="Project image URL"
        value={image}
        onChange={(value) =>
          setValue(`items.${index}.image`, value, { shouldDirty: true, shouldValidate: true })
        }
        folder={`sections/${sectionType}`}
      />
      <label>
        Challenge heading
        <input {...register(`items.${index}.challengeLabel`)} />
      </label>
      <label>
        Challenge text
        <textarea rows={3} {...register(`items.${index}.challenge`, { required: true })} />
      </label>
      <label>
        Solution heading
        <input {...register(`items.${index}.solutionLabel`)} />
      </label>
      <label>
        Solution text
        <textarea rows={3} {...register(`items.${index}.solution`, { required: true })} />
      </label>
      <div className="admin-section-group">
        <h4>Metrics (2 shown on site)</h4>
        <label>
          Metric 1 value
          <input {...register(`items.${index}.metric1Value`, { required: true })} />
        </label>
        <label>
          Metric 1 label
          <input {...register(`items.${index}.metric1Label`, { required: true })} />
        </label>
        <label>
          Metric 2 value
          <input {...register(`items.${index}.metric2Value`, { required: true })} />
        </label>
        <label>
          Metric 2 label
          <input {...register(`items.${index}.metric2Label`, { required: true })} />
        </label>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" {...register(`items.${index}.reverse`)} />
        Reverse layout (image on right)
      </label>
    </>
  );
}

export function ProjectsPortfolioSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: SectionFormProps) {
  const defaultValues = useMemo(
    () => toProjectsPortfolioDefaultValues(section.data),
    [section.data],
  );
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProjectsPortfolioFormValues>({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  function handleValid(values: ProjectsPortfolioFormValues) {
    onSave({
      items: values.items.map((item) => ({
        badge: item.badge,
        title: item.title,
        image: item.image,
        challengeLabel: item.challengeLabel.trim() || "The Challenge",
        challenge: item.challenge,
        solutionLabel: item.solutionLabel.trim() || "The Solution",
        solution: item.solution,
        metrics: [
          { value: item.metric1Value, label: item.metric1Label },
          { value: item.metric2Value, label: item.metric2Label },
        ],
        reverse: item.reverse,
      })),
    });
  }

  return (
    <form
      className="admin-form admin-section-form"
      onSubmit={handleSubmit(handleValid)}
      style={formStyle}
    >
      <SectionHeading section={section} />

      <div>
        <h4>Portfolio projects</h4>
        {fields.map((field, index) => (
          <div key={field.id} style={itemStyle}>
            <h4 style={{ marginTop: 0 }}>Project {index + 1}</h4>
            <PortfolioItemFields
              index={index}
              register={register}
              setValue={setValue}
              watch={watch}
              sectionType={section.type}
            />
            <button type="button" onClick={() => remove(index)} disabled={fields.length === 1}>
              Remove project
            </button>
          </div>
        ))}
        <button
          type="button"
          className="admin-button-secondary"
          onClick={() => append(emptyPortfolioItem(fields.length % 2 === 1))}
        >
          Add project
        </button>
      </div>

      <SectionSaveFooter
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
        previewHref={previewHref}
      />
    </form>
  );
}
