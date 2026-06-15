"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import SectionSaveFooter from "@/components/admin/SectionSaveFooter";
import {
  DEFAULT_LEGAL_DOCUMENT,
  DEFAULT_LEGAL_HERO,
  type LegalDocumentSectionItem,
} from "@/data/terms-reference";

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

function splitParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinParagraphs(values: string[]): string {
  return values.join("\n\n");
}

function sectionHasBullets(item: LegalDocumentSectionItem): boolean {
  return Boolean(item.introBeforeBullets || item.bullets?.length || item.outroAfterBullets);
}

function sectionHasContact(item: LegalDocumentSectionItem): boolean {
  return Boolean(item.contact);
}

type LegalHeroFormValues = {
  title: string;
};

export function LegalHeroSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: SectionFormProps) {
  const defaultValues = useMemo<LegalHeroFormValues>(
    () => ({
      title: (section.data.title as string) ?? DEFAULT_LEGAL_HERO.title,
    }),
    [section.data],
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LegalHeroFormValues>({ defaultValues });

  function handleValid(values: LegalHeroFormValues) {
    onSave({ title: values.title.trim() });
  }

  return (
    <form
      className="admin-form admin-section-form"
      onSubmit={handleSubmit(handleValid)}
      style={formStyle}
    >
      <h3>Banner</h3>

      <label>
        Page title
        <input type="text" {...register("title", { required: "Title is required" })} />
        {errors.title ? <span className="admin-error">{errors.title.message}</span> : null}
      </label>

      <SectionSaveFooter
        previewHref={previewHref}
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
      />
    </form>
  );
}

type LegalDocumentSectionFormValues = {
  title: string;
  paragraphs: string;
  bullets: string;
  contactCompanyName: string;
  contactEmail: string;
  contactPhone: string;
};

type LegalDocumentFormValues = {
  sections: LegalDocumentSectionFormValues[];
};

function toLegalDocumentSectionFormValues(
  item: LegalDocumentSectionItem,
): LegalDocumentSectionFormValues {
  const paragraphs = [...item.paragraphs];
  if (item.outroAfterBullets?.trim()) {
    paragraphs.push(item.outroAfterBullets.trim());
  }

  const bulletLines = [...(item.bullets ?? [])];
  if (item.introBeforeBullets?.trim()) {
    bulletLines.unshift(item.introBeforeBullets.trim());
  }

  return {
    title: item.title,
    paragraphs: joinParagraphs(paragraphs),
    bullets: bulletLines.join("\n"),
    contactCompanyName: item.contact?.companyName ?? "",
    contactEmail: item.contact?.email ?? "",
    contactPhone: item.contact?.phone ?? "",
  };
}

function toLegalDocumentDefaultValues(data: Record<string, unknown>): LegalDocumentFormValues {
  const sections = Array.isArray(data.sections)
    ? (data.sections as LegalDocumentSectionItem[])
    : DEFAULT_LEGAL_DOCUMENT.sections;

  return {
    sections: sections.map(toLegalDocumentSectionFormValues),
  };
}

function fromLegalDocumentFormValues(
  values: LegalDocumentFormValues,
  originals: LegalDocumentSectionItem[],
): LegalDocumentSectionItem[] {
  return values.sections.map((section, index) => {
    const original = originals[index];
    const item: LegalDocumentSectionItem = {
      title: section.title.trim(),
      paragraphs: splitParagraphs(section.paragraphs),
    };

    if (original && sectionHasBullets(original)) {
      const lines = splitLines(section.bullets);

      if (original.introBeforeBullets?.trim()) {
        item.introBeforeBullets = lines[0] ?? original.introBeforeBullets;
        item.bullets = lines.slice(1);
      } else {
        item.bullets = lines;
      }

      if (original.outroAfterBullets?.trim() && item.paragraphs.length > 0) {
        item.outroAfterBullets = item.paragraphs.pop() ?? original.outroAfterBullets;
      }
    }

    if (original && sectionHasContact(original)) {
      item.contact = {
        companyName: section.contactCompanyName.trim(),
        email: section.contactEmail.trim(),
        phone: section.contactPhone.trim(),
      };
    }

    return item;
  });
}

export function LegalDocumentSectionForm({
  section,
  onSave,
  previewHref,
  saveMessage,
  saveMessageTone,
}: SectionFormProps) {
  const originalSections = useMemo(
    () =>
      Array.isArray(section.data.sections)
        ? (section.data.sections as LegalDocumentSectionItem[])
        : DEFAULT_LEGAL_DOCUMENT.sections,
    [section.data],
  );
  const defaultValues = useMemo(
    () => toLegalDocumentDefaultValues(section.data),
    [section.data],
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LegalDocumentFormValues>({ defaultValues });

  function handleValid(values: LegalDocumentFormValues) {
    onSave({ sections: fromLegalDocumentFormValues(values, originalSections) });
  }

  return (
    <form
      className="admin-form admin-section-form"
      onSubmit={handleSubmit(handleValid)}
      style={formStyle}
    >
      <h3>Document content</h3>
      <p className="admin-muted" style={{ marginTop: 0 }}>
        Edit each numbered section below. Use a blank line between paragraphs.
      </p>

      {defaultValues.sections.map((field, index) => {
        const original = originalSections[index];
        const showBullets = original ? sectionHasBullets(original) : false;
        const showContact = original ? sectionHasContact(original) : false;

        return (
          <div key={`${field.title}-${index}`} style={itemStyle}>
            <h4 style={{ marginTop: 0 }}>{field.title || `Section ${index + 1}`}</h4>

            <label>
              Section heading
              <input
                type="text"
                {...register(`sections.${index}.title`, { required: "Heading is required" })}
              />
              {errors.sections?.[index]?.title ? (
                <span className="admin-error">{errors.sections[index]?.title?.message}</span>
              ) : null}
            </label>

            <label>
              Content
              <textarea rows={showBullets ? 4 : 6} {...register(`sections.${index}.paragraphs`)} />
            </label>

            {showBullets ? (
              <label>
                List content (intro line and bullet points, one per line)
                <textarea rows={5} {...register(`sections.${index}.bullets`)} />
              </label>
            ) : null}

            {showContact ? (
              <>
                <label>
                  Contact company name
                  <input type="text" {...register(`sections.${index}.contactCompanyName`)} />
                </label>
                <label>
                  Contact email
                  <input type="text" {...register(`sections.${index}.contactEmail`)} />
                </label>
                <label>
                  Contact phone
                  <input type="text" {...register(`sections.${index}.contactPhone`)} />
                </label>
              </>
            ) : null}
          </div>
        );
      })}

      <SectionSaveFooter
        previewHref={previewHref}
        isSubmitting={isSubmitting}
        message={saveMessage}
        messageTone={saveMessageTone}
      />
    </form>
  );
}
