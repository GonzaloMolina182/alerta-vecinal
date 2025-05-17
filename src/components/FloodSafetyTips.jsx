import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Droplet, CheckCircle2 } from "lucide-react";

const tips = [
  {
    icon: <Droplet className="w-6 h-6 text-blue-600" />,
    title: "Antes de la Inundación",
    points: [
      "Revisá desagües y canaletas.",
      "Armá un kit de emergencia con linterna, agua y documentos.",
      "Guardá objetos de valor en lugares altos.",
    ],
  },
  {
    icon: <AlertCircle className="w-6 h-6 text-yellow-600" />,
    title: "Durante la Inundación",
    points: [
      "No camines ni manejes por zonas inundadas.",
      "Cortá la electricidad si hay riesgo de contacto con agua.",
      "Seguí instrucciones de Defensa Civil y autoridades locales.",
    ],
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
    title: "Después de la Inundación",
    points: [
      "No consumas agua hasta que sea declarada segura.",
      "Desinfectá superficies con lavandina.",
      "Tramitá ayuda si sufriste pérdidas materiales.",
    ],
  },
];

export default function FloodSafetyTips() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Cómo Protegerse</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tips.map((section, i) => (
          <Card key={i} className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <h3 className="font-semibold text-lg">{section.title}</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
