"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SectionSaveFooter from "@/components/admin/SectionSaveFooter";
import { HERO_SECTION_DEFAULT } from "@/data/page-section-defaults";

type HeroFormValues = {
  badge: string;
  titleLines: string;
  description: string;
  highlightsLines: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  visualImage: string;
  visualImageAlt: string;
};

type HeroSectionFormProps = {
  section: { id: string; type: string; order: number; data: Record<string, unknown> };
  onSave: (data: Record<string, unknown>) => void;
  previewHref: string;
  saveMessage?: string | null;
  saveMessageTone?: "success" | "error";
};

function toDefaultValues(data: Record<string, unknown>): HeroFormValues {
  const badge = (data.badge as string) ?? "";
  const title = Array.isArray(data.title) ? (data.title as string[]) : [];
  const description = (data.description as string) ?? "";
  const primary = (data.primaryAction as Record<string, unknown>) ?? {};
  const secondary = (data.secondaryAction as Record<string, unknown>) ?? {};
  const visualImage =
    (data.visualImage as string)?.trim() || HERO_SECTION_DEFAULT.visualImage;
  const visualImageAlt =
    (data.visualImageAlt as string)?.trim() || HERO_SECTION_DEFAULT.visualImageAlt;
  const highlights = Array.isArray(data.highlights)
    ? (data.highlights as string[])
    : HERO_SECTION_DEFAULT.highlights;

  return {
    badge,
    titleLines: title.join("\n"),
    description,
    highlightsLines: highlights.join("\n"),
    primaryLabel:
      (primary.label as string)?.trim() || HERO_SECTION_DEFAULT.primaryAction.label,
    primaryHref:
      (primary.href as string)?.trim() || HERO_SECTION_DEFAULT.primaryAction.href,
    secondaryLabel:
      (secondary.label as string)?.trim() || HERO_SECTION_DEFAULT.secondaryAction.label,
    secondaryHref:
      (secondary.href as string)?.trim() || HERO_SECTION_DEFAULT.secondaryAction.href,
    visualImage,
    visualImageAlt,
  };
}

export default function HeroSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: HeroSectionFormProps) {
  const defaultValues = useMemo(() => toDefaultValues(section.data), [section.data]);

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HeroFormValues>({
    defaultValues,
  });
  const visualImage = watch("visualImage");

  function handleValid(values: HeroFormValues) {
    const titleArray = values.titleLines
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const highlights = values.highlightsLines
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload: Record<string, unknown> = {
      badge: values.badge,
      title: titleArray,
      description: values.description,
      highlights,
      primaryAction: {
        label: values.primaryLabel,
        href: values.primaryHref,
      },
      secondaryAction: {
        label: values.secondaryLabel,
        href: values.secondaryHref,
      },
      visualImage: values.visualImage,
      visualImageAlt: values.visualImageAlt.trim(),
    };

    onSave(payload);
  }

  function handleInvalid() {
    // We still allow submit (per requirements), backend will validate too.
  }

  return (
    <form
      className="admin-form hero-section-form"
      onSubmit={handleSubmit(handleValid, handleInvalid)}
      style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid #e2e8f0" }}
    >
      <h3>
        hero{" "}
        <span className="admin-muted" style={{ fontWeight: 400 }}>
          (order {section.order}, id {section.id})
        </span>
      </h3>

      <label>
        Badge (optional)
        <input
          {...register("badge")}
          placeholder="DUBAI LICENSED TECHNOLOGY COMPANY"
        />
      </label>

      <label>
        Title lines (one per line, second line appears in accent color)
        <textarea
          rows={3}
          {...register("titleLines", { required: "At least one title line is required" })}
        />
        {errors.titleLines ? (
          <p className="admin-field-error">{errors.titleLines.message}</p>
        ) : null}
      </label>

      <label>
        Description
        <textarea
          rows={4}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description ? (
          <p className="admin-field-error">{errors.description.message}</p>
        ) : null}
      </label>

      <label>
        Feature points (one per line)
        <textarea
          rows={4}
          {...register("highlightsLines")}
          placeholder={"Licensed UAE Company\nEnterprise Security Solutions\nBlockchain & Cloud Experts"}
        />
      </label>

      <div className="hero-section-form__actions">
        <div>
          <h4>Primary button</h4>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Solid button shown first (reference: Schedule Consultation).
          </p>
          <label>
            Button label
            <input
              {...register("primaryLabel", { required: "Primary label is required" })}
              placeholder="Schedule Consultation"
            />
            {errors.primaryLabel ? (
              <p className="admin-field-error">{errors.primaryLabel.message}</p>
            ) : null}
          </label>
          <label>
            Button link (href)
            <input
              {...register("primaryHref", { required: "Primary href is required" })}
              placeholder="/contact"
            />
            {errors.primaryHref ? (
              <p className="admin-field-error">{errors.primaryHref.message}</p>
            ) : null}
          </label>
        </div>
        <div>
          <h4>Secondary button</h4>
          <p className="admin-muted" style={{ marginTop: 0 }}>
            Outline button beside the primary (reference: Explore Services).
          </p>
          <label>
            Button label
            <input
              {...register("secondaryLabel")}
              placeholder="Explore Services"
            />
          </label>
          <label>
            Button link (href)
            <input {...register("secondaryHref")} placeholder="/services" />
          </label>
        </div>
      </div>

      <input
        type="hidden"
        {...register("visualImage", { required: "Hand & globe image is required" })}
      />
      <ImageUploadField
        label="Hand & globe image"
        value={visualImage}
        onChange={(value) =>
          setValue("visualImage", value, { shouldDirty: true, shouldValidate: true })
        }
        folder={`sections/${section.type}`}
        placeholder="/home/hero-visual.png"
      />
      <label>
        Image alt text
        <input
          {...register("visualImageAlt", { required: "Alt text is required for accessibility" })}
          placeholder={HERO_SECTION_DEFAULT.visualImageAlt}
        />
      </label>
      <p className="admin-muted" style={{ marginTop: "0.35rem" }}>
        Robotic hand and digital globe shown on the right side of the hero.
      </p>
      {errors.visualImage ? (
        <p className="admin-field-error">{errors.visualImage.message}</p>
      ) : null}

      <SectionSaveFooter
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
        previewHref={previewHref}
      />
    </form>
  );
}
